import { useEffect, useRef, useState } from 'react';
import { AttributionControl } from './controls/attribution-control/AttributionControl';
import { MapControl } from './controls/map-control/MapControl';
import { MapInstance } from './map-instance/map-instance';
import { SearchBar } from './search-bar/SearchBar';

const Map = () => {
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);
  const [activeBaseLayer, setActiveBaseLayer] = useState<string>('');
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new MapInstance({ container: mapContainer.current });
      setMapInstance(map);
      return () => map.remove();
    }
  }, []);

  return (
    <div className="h-full w-full" ref={mapContainer}>
      <SearchBar map={mapInstance} />
      <MapControl map={mapInstance!} setActiveBaseLayer={setActiveBaseLayer} />
      <AttributionControl map={mapInstance} activeBaseLayer={activeBaseLayer} />
    </div>
  );
};

export default Map;
