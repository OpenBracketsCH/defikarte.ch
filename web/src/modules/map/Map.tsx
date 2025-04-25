import { Feature } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import { MapEventCallback } from '../../model/map';
import { AttributionControl } from './controls/attribution-control/AttributionControl';
import { DetailView } from './controls/detail-view/DetailView';
import { MapControl } from './controls/map-control/MapControl';
import { SearchControl } from './controls/search-control/SearchControl';
import { SponsorControl } from './controls/sponsor-control/SponsorControl';
import { MapInstance } from './map-instance/map-instance';

const Map = () => {
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);
  const [activeBaseLayer, setActiveBaseLayer] = useState<string>('');
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  const onMapEvent: MapEventCallback = event => {
    if (event.type === 'item-select') {
      console.log('item-select', event);
      setSelectedFeature(event.data);
    }
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
      <MapControl map={mapInstance!} setActiveBaseLayer={setActiveBaseLayer} />
      <AttributionControl activeBaseLayer={activeBaseLayer} />
      <SponsorControl />
      {selectedFeature && <DetailView feature={selectedFeature} />}
    </div>
  );
};

export default Map;
