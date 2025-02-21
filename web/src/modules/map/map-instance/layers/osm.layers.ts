import { LayerSpecification } from "maplibre-gl";
import { LayerConfiguration } from "../configuration/layer.configuration";

export const createOsmLayerSpec = (): LayerSpecification => {
  return {
    id: LayerConfiguration.osmLayerId,
    source: LayerConfiguration.osmLayerSource,
    type: "raster",
  };
};
