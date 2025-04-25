import { useEffect, useRef, useState } from 'react';
import { MapEvent, MapEventCallback } from '../../model/map';
import { AttributionControl } from './controls/attribution-control/AttributionControl';
import { DetailView } from './controls/detail-view/DetailView';
import { MapControl } from './controls/map-control/MapControl';
import { SearchControl } from './controls/search-control/SearchControl';
import { SponsorControl } from './controls/sponsor-control/SponsorControl';
import { FEATURE_STATE } from './map-instance/configuration/constants';
import { MapConfiguration } from './map-instance/configuration/map.configuration';
import { MapInstance } from './map-instance/map-instance';

const Map = () => {
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);
  const [activeBaseLayer, setActiveBaseLayer] = useState<string>(
    MapConfiguration.osmVectorBasemapId
  );
  const [selectedMapEvent, setSelectedMapEvent] = useState<MapEvent | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const onMapEvent: MapEventCallback = event => {
    if (event.type === 'item-select') {
      console.log('item-select', event);
      setSelectedMapEvent(event);
    }
  };

  const onDetailViewClose = () => {
    const featureId = selectedMapEvent?.data?.id;
    mapInstance?.setFeatureState(selectedMapEvent?.source, featureId, {
      [FEATURE_STATE.SELECTED]: false,
    });
    setSelectedMapEvent(null);
  };

  useEffect(() => {
    if (mapContainer.current) {
      const map = new MapInstance({
        container: mapContainer.current,
        onEvent: onMapEvent,
      });
      setMapInstance(map);
      return () => map.remove();
    }
  }, []);

  return (
    <div className="h-full w-full">
      <div className="h-full w-full" ref={mapContainer} />
      <SearchControl map={mapInstance} />
      <MapControl
        map={mapInstance!}
        setActiveBaseLayer={setActiveBaseLayer}
        activeBaseLayer={activeBaseLayer}
      />
      <AttributionControl activeBaseLayer={activeBaseLayer} />
      <SponsorControl />
      {selectedMapEvent && (
        <DetailView feature={selectedMapEvent.data} onClose={onDetailViewClose} />
      )}
    </div>
  );
};

export default Map;
