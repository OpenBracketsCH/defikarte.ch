import { LayerConfiguration } from "../../map-instance/configuration/layer.configuration";
import { MapInstance } from "../../map-instance/map-instance";

type Props = {
  map: MapInstance;
};

export const LayerControl = (props: Props) => {
  const map = props.map;
  return (
    <div style={{ zIndex: 10000, position: "absolute", top: 0, left: 0 }}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          map.setBaseLayer(LayerConfiguration.swisstopoBaseMapLayerId)
        }
      >
        BaseMap
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          map.setBaseLayer(LayerConfiguration.swisstopoImageryBaseMapLayerId)
        }
      >
        Satellite
      </button>

      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => map.setBaseLayer(LayerConfiguration.osmLayerId)}
      >
        Osm
      </button>
    </div>
  );
};
