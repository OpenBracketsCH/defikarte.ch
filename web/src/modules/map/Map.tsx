import { Point } from 'geojson';
import { MapGeoJSONFeature } from 'maplibre-gl';
import { Dispatch, SetStateAction, useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import iconGpsWarningCircleRed from '../../assets/icons/icon-gps-warning-circle-red.svg';
import { CustomToast } from '../../components/ui/custom-toast/CustomToast';
import { SplashScreen } from '../../components/ui/splash-screen/SplashScreen';
import AppConfiguration from '../../configuration/app.configuration';
import {
  CreateMode,
  FilterType,
  MapEvent,
  MapEventCallback,
  MapInteractionEvent,
  OverlayType,
} from '../../model/map';
import { AttributionControl } from './controls/attribution-control/AttributionControl';
import { CreateAedControl } from './controls/create-aed-control/CreateAedControl';
import { CreateButtonControl } from './controls/create-button-control/CreateButtonControl';
import { DetailView } from './controls/detail-view/DetailView';
import { MapControl } from './controls/map-control/MapControl';
import { SearchControl } from './controls/search-control/SearchControl';
import { SponsorControl } from './controls/sponsor-control/SponsorControl';
import { deselectAllFeatures } from './helper';
import { useHandleCreateMode } from './hooks/useHandleCreateMode';
import { useMapEvents } from './hooks/useMapEvents';
import { usePersistenceState } from './hooks/usePersistenceState';
import { useUserLocation } from './hooks/useUserLocation';
import { FEATURE_STATE } from './map-instance/configuration/constants';
import { MapConfiguration } from './map-instance/configuration/map.configuration';
import ItemSelectInteraction from './map-instance/interactions/item-select.interaction';
import { MapInstance } from './map-instance/map-instance';

const createFilterKey = (filter: FilterType | FilterType[]) => {
  if (Array.isArray(filter)) {
    return filter.sort().join('');
  }

  return filter;
};

const baseLayer: string = MapConfiguration.osmVectorBasemapId;
const overlay: FilterType[] = [FilterType.alwaysAvailable, FilterType.withOpeningHours];
const filterToOverlayMapping = {
  [createFilterKey(FilterType.alwaysAvailable)]: OverlayType.aedAlwaysAvailable,
  [createFilterKey(FilterType.withOpeningHours)]: OverlayType.aedWithOpeningHours,
  [createFilterKey(FilterType.byAvailability)]: OverlayType.aedByCurrentAvailability,
  [createFilterKey([FilterType.alwaysAvailable, FilterType.withOpeningHours])]: OverlayType.aedAll,
};

type MapProps = {
  setIsFullscreen: Dispatch<SetStateAction<boolean>>;
};

export const Map = ({ setIsFullscreen }: MapProps) => {
  const { t } = useTranslation();
  const mapInstanceRef = useRef<MapInstance | null>(null);
  const mapInstance = mapInstanceRef.current;
  const { isInitialized, handleMapEvent } = useMapEvents();
  const [activeBaseLayer, setActiveBaseLayer] = usePersistenceState<string>(
    AppConfiguration.baseLayerLocalStorageKey,
    baseLayer
  );
  const [activeOverlays, setActiveOverlays] = useState<FilterType[]>(overlay);
  const [selectedFeature, setSelectedFeature] = useState<MapInteractionEvent | null>(null);
  const [editFeature, setEditFeature] = useState<MapInteractionEvent | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);
  const [createMode, setCreateMode] = useHandleCreateMode({
    map: mapInstance,
    feature: editFeature || null,
  });
  const userLocation = useUserLocation({ map: mapInstance });
  const {
    userLocation: userLocationData,
    isActive: isGpsActive,
    setIsActive: setIsGpsActive,
    error: locationError,
  } = userLocation;

  // automaticly activate fullscreen for editing function
  useEffect(() => {
    setIsFullscreen(createMode === CreateMode.position || createMode === CreateMode.form);

    return () => {
      setIsFullscreen(false);
    };
  }, [createMode, setIsFullscreen]);

  // map event handling
  const onMapEvent: MapEventCallback = useCallback(
    event => {
      if (event.type === 'item-select') {
        setSelectedFeature(event);
      }

      handleMapEvent(event);
    },
    [handleMapEvent]
  );

  // overlay handling
  useEffect(() => {
    const filterKey = createFilterKey(activeOverlays);
    const activeOverlay = filterToOverlayMapping[filterKey];

    mapInstance?.applyOverlay(activeOverlay);

    return () => {
      mapInstance?.removeOverlay(activeOverlay);
    };
  }, [mapInstance, activeOverlays]);

  // location error handling
  useEffect(() => {
    if (locationError) {
      toast.custom(toastInstance => (
        <CustomToast
          toastInstance={toastInstance}
          title={t('locationErrorTitle')}
          message={t(locationError)}
          icon={iconGpsWarningCircleRed}
        />
      ));
    }
  }, [locationError, t]);

  // map initialization
  useEffect(() => {
    if (mapContainer.current && !mapInstanceRef.current && activeBaseLayer) {
      const activeOverlay = filterToOverlayMapping[createFilterKey(overlay)] || OverlayType.aedAll;
      const map = new MapInstance({
        container: mapContainer.current,
        baseLayer: activeBaseLayer,
        overlays: [activeOverlay, OverlayType.userLocation],
        onEvent: onMapEvent,
      });
      mapInstanceRef.current = map;
      return () => mapInstanceRef.current?.remove();
    }
  }, [activeBaseLayer, onMapEvent]);

  const handleSelectOrCenterFeatureOnMap = (event: MapEvent) => {
    if (event.type !== 'item-select' || !event.data) return;

    const interactionExecuted = selectFeatureOnMap(event);
    if (!interactionExecuted) {
      centerFeatureOnMap(event);
    }
  };

  const selectFeatureOnMap = (event: MapInteractionEvent): boolean => {
    if (event.type !== 'item-select' || !event.data) return false;

    let result = false;
    mapInstance?.getActiveMapInteractions()?.forEach(interaction => {
      if (
        interaction instanceof ItemSelectInteraction &&
        interaction.sourceId === event.data?.source
      ) {
        interaction.selectFeature(event.data as MapGeoJSONFeature, null);
        result = true;
      }
    });

    return result;
  };

  const centerFeatureOnMap = (event: MapInteractionEvent | null) => {
    if (!event || !event.data) return;
    const bbox = event.data.geometry.bbox;
    if (bbox && bbox.length === 4) {
      mapInstance?.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ]);

      return;
    }
    const coordinates = (event.data.geometry as Point).coordinates;
    mapInstance?.easeTo(coordinates as [number, number], 18);
  };

  const handleEditFeature = (event: MapInteractionEvent) => {
    if (!event || !event.data) return;
    centerFeatureOnMap(event);
    setEditFeature(event);
    mapInstance?.setFeatureState(event.source || '', event.data.id, {
      [FEATURE_STATE.EDITING]: true,
    });
    setCreateMode(CreateMode.form);
  };

  return (
    <div className="relative flex-grow w-full">
      <div className="absolute h-dvh w-dvw">
        <div className="h-full w-full" ref={mapContainer} />
      </div>
      {!isInitialized && <SplashScreen />}
      <MapControl
        map={mapInstance!}
        setActiveBaseLayer={setActiveBaseLayer}
        activeBaseLayer={activeBaseLayer}
      />
      {createMode !== CreateMode.none && (
        <CreateAedControl
          map={mapInstance}
          createMode={createMode}
          feature={editFeature}
          setEditFeature={setEditFeature}
          setCreateMode={setCreateMode}
          onFeatureSelect={selectFeatureOnMap}
        />
      )}
      {createMode === CreateMode.none && (
        <>
          <SearchControl
            map={mapInstance}
            isGpsActive={isGpsActive}
            setIsGpsActive={setIsGpsActive}
            onFeatureSelect={handleSelectOrCenterFeatureOnMap}
            activeOverlays={activeOverlays}
            setActiveOverlays={setActiveOverlays}
          />
          <CreateButtonControl setCreateMode={setCreateMode} />
          <SponsorControl />
          <AttributionControl activeBaseLayer={activeBaseLayer} />
          {selectedFeature && (
            <DetailView
              feature={selectedFeature.data}
              userLocation={userLocationData}
              onCenterFeature={() => handleSelectOrCenterFeatureOnMap(selectedFeature)}
              onClose={() => deselectAllFeatures(mapInstance)}
              onEdit={() => handleEditFeature(selectedFeature)}
            />
          )}
        </>
      )}
    </div>
  );
};
