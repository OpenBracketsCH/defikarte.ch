import { LayerSpecification } from "maplibre-gl";
import { LayerConfiguration } from "../configuration/layer.configuration";

export const createAedLayerSpec = (): LayerSpecification => {
  return {
    id: LayerConfiguration.aedLayerId,
    source: LayerConfiguration.aedLayerSource,
    type: "circle",
    paint: {
      "circle-radius": 6,
      "circle-color": "#B42222",
    },
  };
};
