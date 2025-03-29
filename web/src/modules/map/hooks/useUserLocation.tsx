import { useCallback, useEffect, useState } from 'react';
import { GeolocationService } from '../../../services/geolocation.service';
import { MapInstance } from '../map-instance/map-instance';
import { MapConfiguration } from '../map-instance/configuration/map.configuration';

type Props = {
  map: MapInstance | null;
};

export const useUserLocation = ({ map }: Props) => {
  const [geolocationService] = useState(() => new GeolocationService());
  const [isGpsActive, setIsGpsActive] = useState(false);

  const watchUserPosition = useCallback(async (zoomToLocation: boolean): Promise<boolean> => {
    if (!map) {
      return false;
    }

    geolocationService.watchPosition(
      pos => {
        map.setUserLocation(MapConfiguration.userLocationSourceId, pos);
      },
      error => {
        console.error('User location error', error);
      }
    );

    if (!zoomToLocation) {
      return true;
    }

    const currentPostion = await geolocationService.getCurrentPosition();
    if (currentPostion) {
      map.setUserLocation(MapConfiguration.userLocationSourceId, currentPostion);
      map.easyTo([currentPostion?.coords.longitude || 0, currentPostion?.coords.latitude || 0]);
      return true;
    }

    return false;
  }, [geolocationService, map]);

  useEffect(() => {
    let gpsStateBeforeUnmount = isGpsActive;
    console.log('new state', isGpsActive);
    const init = async () => {
      if (isGpsActive) {
        const success = await watchUserPosition(gpsStateBeforeUnmount === isGpsActive);
        if (!success) {
          setIsGpsActive(false);
        }
      } else {
        map?.clearUserLocation();
      }
    };

    init();

    return () => {
      gpsStateBeforeUnmount = isGpsActive;
      console.log('old state', isGpsActive);
    };
  }, [isGpsActive, map, watchUserPosition]);

  return { isGpsActive, setIsGpsActive };
};
