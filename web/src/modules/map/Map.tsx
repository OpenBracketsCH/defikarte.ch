import { useEffect, useRef, useState } from "react";
import { LayerControl } from "./controls/layer-control/LayerControl";
import { MapInstance } from "./map-instance/map-instance";

const Map = () => {
  const [mapInstance, setMapInstance] = useState<MapInstance | null>(null);
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mapContainer.current) {
      const map = new MapInstance(mapContainer.current);
      setMapInstance(map);
      return () => map.remove();
    }
  }, []);

  return (
    <div className="h-full w-full" ref={mapContainer}>
      <LayerControl map={mapInstance!} />
    </div>
  );
};

export default Map;
