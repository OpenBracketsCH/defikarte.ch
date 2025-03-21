import { useEffect, useRef, useState } from 'react';
import { AttributionControl } from './controls/attribution-control/AttributionControl';
import { MapControl } from './controls/map-control/MapControl';
import { MapInstance } from './map-instance/map-instance';
import { SearchControl } from './controls/search-control/SearchControl';
import { SponsorControl } from './controls/sponsor-control/SponsorControl';

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
      <SearchControl map={mapInstance} />
      <MapControl map={mapInstance!} setActiveBaseLayer={setActiveBaseLayer} />
      <AttributionControl activeBaseLayer={activeBaseLayer} />
      <SponsorControl />
    </div>
  );
};

export default Map;
