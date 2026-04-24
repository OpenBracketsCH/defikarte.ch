import { type Point } from 'geojson';
import {
  type Dispatch,
  type ReactNode,
  type SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';
import { type ApiClient } from '../api/api-client';
import { type LocationProvider } from '../model/location-provider';
import {
  CreateMode,
  FilterType,
  type MapEvent,
  type MapEventCallback,
  type MapInteractionEvent,
  OverlayType,
} from '../model/map';
import { deselectAllFeatures } from './helper';
import { useHandleCreateMode } from './hooks/useHandleCreateMode';
import { useMapEvents } from './hooks/useMapEvents';
import { useUserLocation } from './hooks/useUserLocation';
import { FEATURE_STATE } from './map-instance/configuration/constants';
import {
  MapConfiguration,
  type MapConfigurationOptions,
} from './map-instance/configuration/map.configuration';
import ItemSelectInteraction from './map-instance/interactions/item-select.interaction';
import { MapInstance } from './map-instance/map-instance';

const createFilterKey = (filter: FilterType | FilterType[]) => {
  if (Array.isArray(filter)) {
    return filter.sort().join('');
  }

  return filter;
};

const defaultOverlay: FilterType[] = [FilterType.alwaysAvailable, FilterType.withOpeningHours];
const filterToOverlayMapping = {
  [createFilterKey(FilterType.alwaysAvailable)]: OverlayType.aedAlwaysAvailable,
  [createFilterKey(FilterType.withOpeningHours)]: OverlayType.aedWithOpeningHours,
  [createFilterKey(FilterType.byAvailability)]: OverlayType.aedByCurrentAvailability,
  [createFilterKey([FilterType.alwaysAvailable, FilterType.withOpeningHours])]: OverlayType.aedAll,
};

export interface SharedMapState {
  mapInstance: MapInstance | null;
  isInitialized: boolean;
  activeBaseLayer: string;
  setActiveBaseLayer: (layer: string) => void;
  activeOverlays: FilterType[];
  setActiveOverlays: Dispatch<SetStateAction<FilterType[]>>;
  selectedFeature: MapInteractionEvent | null;
  editFeature: MapInteractionEvent | null;
  setEditFeature: Dispatch<SetStateAction<MapInteractionEvent | null>>;
  createMode: CreateMode;
  setCreateMode: Dispatch<SetStateAction<CreateMode>>;
  userLocation: GeolocationPosition | null;
  isGpsActive: boolean;
  setIsGpsActive: Dispatch<SetStateAction<boolean>>;
  locationError: string | null;
  handleSelectOrCenterFeatureOnMap: (event: MapEvent) => void;
  handleEditFeature: (event: MapInteractionEvent) => void;
  handleOnCreateStart: () => void;
  selectFeatureOnMap: (event: MapInteractionEvent) => boolean;
  deselectAll: () => void;
}

interface SharedMapProps {
  config: MapConfigurationOptions;
  apiClient: ApiClient;
  locationProvider: LocationProvider;
  isHash: boolean;
  persistedBaseLayer?: string;
  onBaseLayerChange?: (layer: string) => void;
  children: (state: SharedMapState) => ReactNode;
  splashScreen?: ReactNode;
}

export const SharedMap = ({
  config,
  apiClient,
  locationProvider,
  isHash,
  persistedBaseLayer,
  onBaseLayerChange,
  children,
  splashScreen,
}: SharedMapProps) => {
  // Initialize MapConfiguration once
  const configInitialized = useRef(false);
  if (!configInitialized.current) {
    MapConfiguration.init(config);
    configInitialized.current = true;
  }

  const defaultBaseLayer = persistedBaseLayer || MapConfiguration.osmBaseMapId;

  const mapInstanceRef = useRef<MapInstance | null>(null);
  const mapInstance = mapInstanceRef.current;
  const { isInitialized, handleMapEvent } = useMapEvents();
  const [activeBaseLayer, setActiveBaseLayerState] = useState<string>(defaultBaseLayer);
  const [activeOverlays, setActiveOverlays] = useState<FilterType[]>(defaultOverlay);
  const [selectedFeature, setSelectedFeature] = useState<MapInteractionEvent | null>(null);
  const [editFeature, setEditFeature] = useState<MapInteractionEvent | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [createMode, setCreateMode] = useHandleCreateMode({
    map: mapInstance,
    feature: editFeature ?? null,
  });
  const userLocation = useUserLocation({ map: mapInstance, locationProvider });
  const {
    userLocation: userLocationData,
    isActive: isGpsActive,
    setIsActive: setIsGpsActive,
    error: locationError,
  } = userLocation;

  const setActiveBaseLayer = useCallback(
    (layer: string) => {
      setActiveBaseLayerState(layer);
      onBaseLayerChange?.(layer);
    },
    [onBaseLayerChange]
  );

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

    void mapInstance?.applyOverlay(activeOverlay);

    return () => {
      mapInstance?.removeOverlay(activeOverlay);
    };
  }, [mapInstance, activeOverlays]);

  // map initialization
  useEffect(() => {
    if (mapContainerRef.current && !mapInstanceRef.current && activeBaseLayer) {
      const activeOverlay =
        filterToOverlayMapping[createFilterKey(defaultOverlay)] || OverlayType.aedAll;
      const map = new MapInstance({
        container: mapContainerRef.current,
        baseLayer: activeBaseLayer,
        overlays: [activeOverlay, OverlayType.userLocation],
        onEvent: onMapEvent,
        hash: isHash,
        apiClient: apiClient,
      });
      mapInstanceRef.current = map;
      return () => mapInstanceRef.current?.remove();
    }
  }, [activeBaseLayer, isHash, onMapEvent, apiClient]);

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
        interaction.selectFeature(event.data, null);
        result = true;
      }
    });

    return result;
  };

  const centerFeatureOnMap = (event: MapInteractionEvent | null) => {
    if (!event || !event.data) return;
    const bbox = event.data.geometry.bbox;
    if (bbox?.length === 4) {
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
    mapInstance?.setFeatureState(event.source ?? '', event.data.id, {
      [FEATURE_STATE.EDITING]: true,
    });
    setCreateMode(CreateMode.form);
  };

  const handleOnCreateStart = () => {
    setEditFeature(null);
    setCreateMode(CreateMode.position);
  };

  const deselectAll = () => {
    deselectAllFeatures(mapInstance);
  };

  const mapState: SharedMapState = {
    mapInstance,
    isInitialized,
    activeBaseLayer,
    setActiveBaseLayer,
    activeOverlays,
    setActiveOverlays,
    selectedFeature,
    editFeature,
    setEditFeature,
    createMode,
    setCreateMode,
    userLocation: userLocationData,
    isGpsActive,
    setIsGpsActive,
    locationError,
    handleSelectOrCenterFeatureOnMap,
    handleEditFeature,
    handleOnCreateStart,
    selectFeatureOnMap,
    deselectAll,
  };

  return (
    <div className="relative flex-grow w-full h-full">
      <div className="h-full w-full">
        <div className="h-full w-full" ref={mapContainerRef} />
      </div>
      {!isInitialized && splashScreen}
      {children(mapState)}
    </div>
  );
};
