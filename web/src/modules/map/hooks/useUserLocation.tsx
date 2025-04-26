import circle from '@turf/circle';
import { Position } from 'geojson';
import { LngLatBounds, LngLatLike } from 'maplibre-gl';
import { useCallback, useEffect, useState } from 'react';
import { GeolocationService } from '../../../services/geolocation.service';
import { MapConfiguration } from '../map-instance/configuration/map.configuration';
import { MapInstance } from '../map-instance/map-instance';
import { usePrevious } from './usePrevious';

const calculateBounds = (position: GeolocationPosition): LngLatBounds => {
  const userLocationExtend = circle(
    [position.coords.longitude, position.coords.latitude],
    position.coords.accuracy / 1000,
    {
      units: 'kilometers',
    }
  );
  const bounds = new LngLatBounds();
  userLocationExtend.geometry.coordinates[0].forEach((coordinate: Position) => {
    bounds.extend(coordinate as LngLatLike);
  });

  return bounds;
};

const geolocationOptions: PositionOptions = {
  enableHighAccuracy: true,
  maximumAge: 1000 * 60 * 5, // 5 minutes
};

const locationErrorMessages = {
  [`${GeolocationPositionError.PERMISSION_DENIED}`]: 'locationPermissionDenied',
  [`${GeolocationPositionError.POSITION_UNAVAILABLE}`]: 'locationUnavailable',
  [`${GeolocationPositionError.TIMEOUT}`]: 'locationTimeout',
};

type Props = {
  map: MapInstance | null;
};

export const useUserLocation = ({ map }: Props) => {
  const [geolocationService] = useState(() => new GeolocationService());
  const [userLocation, setUserLocation] = useState<GeolocationPosition | null>(null);
  const [isActive, setIsActive] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previousIsActive = usePrevious(isActive);

  const isPositionValid = (position: GeolocationPosition): boolean => {
    const isAccurate = position.coords.accuracy < 1000;
    return isAccurate;
  };

  const handleError = useCallback((msg: string) => {
    setError(msg);
    setIsActive(false);
    setUserLocation(null);
  }, []);

  const watchUserPosition = useCallback(() => {
    if (!map) {
      return;
    }

    geolocationService.watchPosition(
      pos => {
        if (!isPositionValid(pos)) {
          handleError('locationNotAccurate');
          return;
        }

        setError(null);
        map.setUserLocation(MapConfiguration.userLocationSourceId, pos);
        setUserLocation(pos);
      },
      error => {
        handleError(locationErrorMessages[error.code]);
      },
      geolocationOptions
    );
  }, [geolocationService, handleError, map]);

  useEffect(() => {
    const handleIsActive = async () => {
      setError(null);
      if (isActive) {
        try {
          const currentPostion = await geolocationService.getCurrentPosition({
            ...geolocationOptions,
            timeout: 5000,
          });

          if (
            previousIsActive !== isActive &&
            isActive &&
            currentPostion &&
            isPositionValid(currentPostion)
          ) {
            map?.setUserLocation(MapConfiguration.userLocationSourceId, currentPostion);
            map?.fitBounds(calculateBounds(currentPostion));
            setUserLocation(currentPostion);
            setError(null);
          }

          watchUserPosition();
        } catch (error) {
          if (error instanceof GeolocationPositionError) {
            handleError(locationErrorMessages[error.code]);
          } else {
            handleError('unknownLocationErrorOccurred');
          }
        }
      } else {
        map?.clearUserLocation();
        geolocationService.clearWatch();
        setUserLocation(null);
      }
    };

    handleIsActive();
  }, [
    geolocationService,
    isActive,
    previousIsActive,
    map,
    handleError,
    watchUserPosition,
    setUserLocation,
  ]);

  return { userLocation, isActive, error, setIsActive };
};
