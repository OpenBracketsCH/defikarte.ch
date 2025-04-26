import { Point } from 'geojson';
import { MapGeoJSONFeature } from 'maplibre-gl';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { ActiveOverlayType, MapEvent, MapEventCallback } from '../../model/map';
import { AttributionControl } from './controls/attribution-control/AttributionControl';
import { DetailView } from './controls/detail-view/DetailView';
import { MapControl } from './controls/map-control/MapControl';
import { SearchControl } from './controls/search-control/SearchControl';
import { SponsorControl } from './controls/sponsor-control/SponsorControl';
import { useUserLocation } from './hooks/useUserLocation';
import { MapConfiguration } from './map-instance/configuration/map.configuration';
import ItemSelectInteraction from './map-instance/interactions/item-select.interaction';
import { MapInstance } from './map-instance/map-instance';

const baseLayer: string = MapConfiguration.osmVectorBasemapId;
const overlay: ActiveOverlayType = ['247', 'restricted'];

export const Map = () => {
  const { t } = useTranslation();
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);
  const [activeBaseLayer, setActiveBaseLayer] = useState<string>(baseLayer);
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlayType>(overlay);
  const [selectedFeature, setSelectedFeature] = useState<MapEvent | null>(null);
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

  const onFeatureDeselect = () => {
    mapInstance?.getActiveMapInteractions()?.forEach(interaction => {
      if (interaction instanceof ItemSelectInteraction) {
        interaction.deselectFeatures();
      }
    });
  };

  const onFeatureSelect = (event: MapEvent) => {
    if (!event.data) return;

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
    if (locationError) {
      toast.error(t(locationError));
    }
  }, [locationError, t]);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new MapInstance({
        container: mapContainer.current,
        baseLayer: baseLayer,
        overlay: overlay,
        onEvent: onMapEvent,
      });
      setMapInstance(map);
      return () => map.remove();
    }
  }, []);

  return (
    <div className="h-full w-full">
      <div className="h-full w-full" ref={mapContainer} />
      <SearchControl
        map={mapInstance}
        isGpsActive={isGpsActive}
        setIsGpsActive={setIsGpsActive}
        onFeatureSelect={onFeatureSelect}
        activeOverlay={activeOverlay}
        setActiveOverlay={setActiveOverlay}
      />
      <MapControl
        map={mapInstance!}
        setActiveBaseLayer={setActiveBaseLayer}
        activeBaseLayer={activeBaseLayer}
      />
      <AttributionControl activeBaseLayer={activeBaseLayer} />
      <SponsorControl />
      {selectedFeature && (
        <DetailView
          feature={selectedFeature.data}
          userLocation={userLocationData}
          onCenterFeature={() => onFeatureSelect(selectedFeature)}
          onClose={onFeatureDeselect}
        />
      )}
    </div>
  );
};
