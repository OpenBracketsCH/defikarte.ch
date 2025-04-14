import { useEffect, useRef, useState } from 'react';
import { AttributionControl } from './controls/attribution-control/AttributionControl';
import { DetailView } from './controls/detail-view/DetailView';
import { MapControl } from './controls/map-control/MapControl';
import { SearchControl } from './controls/search-control/SearchControl';
import { SponsorControl } from './controls/sponsor-control/SponsorControl';
import { MapInstance } from './map-instance/map-instance';

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
    <div className="h-full w-full">
      <div className="h-full w-full" ref={mapContainer} />
      <SearchControl map={mapInstance} />
      <MapControl map={mapInstance!} setActiveBaseLayer={setActiveBaseLayer} />
      <AttributionControl activeBaseLayer={activeBaseLayer} />
      <SponsorControl />
      <DetailView />
    </div>
  );
};

export default Map;
