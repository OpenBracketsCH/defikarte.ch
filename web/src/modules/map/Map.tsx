import { useEffect, useRef, useState } from "react";
import { LayerControl } from "./controls/layer-control/LayerControl";
import { MapInstance } from "./map-instance/map-instance";
import { FilterControl } from "./controls/filter-control/FilterControl";

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
      <LayerControl map={mapInstance!} />
      <FilterControl map={mapInstance!} />
    </div>
  );
};

export default Map;
