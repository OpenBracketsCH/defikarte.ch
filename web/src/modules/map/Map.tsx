import { Point } from 'geojson';
import { MapGeoJSONFeature } from 'maplibre-gl';
import { useCallback, useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { FilterType, MapEvent, MapEventCallback, OverlayType } from '../../model/map';
import { AttributionControl } from './controls/attribution-control/AttributionControl';
import { CreateAedControl } from './controls/create-aed-control/CreateAedControl';
import { DetailView } from './controls/detail-view/DetailView';
import { MapControl } from './controls/map-control/MapControl';
import { SearchControl } from './controls/search-control/SearchControl';
import { SponsorControl } from './controls/sponsor-control/SponsorControl';
import { useUserLocation } from './hooks/useUserLocation';
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
const overlay: FilterType[] = [FilterType.alwaysAvailable, FilterType.restricted];
const filterToOverlayMapping = {
  [createFilterKey(FilterType.alwaysAvailable)]: OverlayType.aed247,
  [createFilterKey(FilterType.restricted)]: OverlayType.aedRestricted,
  [createFilterKey(FilterType.availability)]: OverlayType.aedAvailability,
  [createFilterKey([FilterType.alwaysAvailable, FilterType.restricted])]: OverlayType.aed,
};

export const Map = () => {
  const { t } = useTranslation();
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);
  const [activeBaseLayer, setActiveBaseLayer] = useState<string>(baseLayer);
  const [activeOverlays, setActiveOverlays] = useState<FilterType[]>(overlay);
  const [selectedFeature, setSelectedFeature] = useState<MapEvent | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const mapContainer = useRef<HTMLDivElement>(null);
  const userLocation = useUserLocation({ map: mapInstance });
  const {
    userLocation: userLocationData,
    isActive: isGpsActive,
    setIsActive: setIsGpsActive,
    error: locationError,
  } = userLocation;

  const onMapEvent: MapEventCallback = event => {
    if (event.type === 'item-select') {
      setSelectedFeature(event);
    }
  };

  const onFeatureDeselect = useCallback(() => {
    mapInstance?.getActiveMapInteractions()?.forEach(interaction => {
      if (interaction instanceof ItemSelectInteraction) {
        interaction.deselectFeatures();
      }
    });
  }, [mapInstance]);

  const onFeatureSelect = (event: MapEvent) => {
    if (event.type !== 'item-select' || !event.data) return;

    let interactionExecuted = false;
    mapInstance?.getActiveMapInteractions()?.forEach(interaction => {
      if (
        interaction instanceof ItemSelectInteraction &&
        interaction.sourceId === event.data?.source
      ) {
        interaction.selectFeature(event.data as MapGeoJSONFeature, null);
        interactionExecuted = true;
      }
    });

    if (!interactionExecuted) {
      const bbox = event.data.geometry.bbox;
      if (bbox && bbox.length === 4) {
        mapInstance?.fitBounds([
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]],
        ]);
      }
      const coordinates = (event.data.geometry as Point).coordinates;
      mapInstance?.easeTo(coordinates as [number, number], 18);
    }
  };

  useEffect(() => {
    const filterKey = createFilterKey(activeOverlays);
    const activeOverlay = filterToOverlayMapping[filterKey];
    const inactiveOverlays = Object.values(filterToOverlayMapping).filter(
      overlay => overlay !== activeOverlay
    );

    for (const overlay of inactiveOverlays) {
      mapInstance?.removeOverlay(overlay);
    }

    if (activeOverlay) {
      mapInstance?.applyOverlay(activeOverlay);
    }
  }, [mapInstance, activeOverlays]);

  useEffect(() => {
    if (locationError) {
      toast.error(t(locationError));
    }
  }, [locationError, t]);

  useEffect(() => {
    if (mapContainer.current) {
      const activeOverlay = filterToOverlayMapping[createFilterKey(overlay)] || OverlayType.aed;
      const map = new MapInstance({
        container: mapContainer.current,
        baseLayer: baseLayer,
        overlays: [activeOverlay, OverlayType.userLocation],
        onEvent: onMapEvent,
      });
      setMapInstance(map);
      return () => map.remove();
    }
  }, []);

  return (
    <div className="h-full w-full">
      <div className="h-full w-full" ref={mapContainer} />
      <AttributionControl activeBaseLayer={activeBaseLayer} />
      <CreateAedControl
        map={mapInstance}
        isCreating={isCreating}
        setIsCreating={setIsCreating}
        featureDeselect={onFeatureDeselect}
      />
      <MapControl
        map={mapInstance!}
        setActiveBaseLayer={setActiveBaseLayer}
        activeBaseLayer={activeBaseLayer}
      />
      {!isCreating && (
        <>
          <SearchControl
            map={mapInstance}
            isGpsActive={isGpsActive}
            setIsGpsActive={setIsGpsActive}
            onFeatureSelect={onFeatureSelect}
            activeOverlays={activeOverlays}
            setActiveOverlays={setActiveOverlays}
          />

          <SponsorControl />
          {selectedFeature && (
            <DetailView
              feature={selectedFeature.data}
              userLocation={userLocationData}
              onCenterFeature={() => onFeatureSelect(selectedFeature)}
              onClose={onFeatureDeselect}
            />
          )}
        </>
      )}
    </div>
  );
};
