import { useEffect, useRef, useState } from 'react';
import { MapControl } from './controls/map-control/MapControl';
import { MapInstance } from './map-instance/map-instance';
import { SearchBar } from './search-bar/SearchBar';

const Map = () => {
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);
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
      <MapControl map={mapInstance!} />
    </div>
  );
};

export default Map;
