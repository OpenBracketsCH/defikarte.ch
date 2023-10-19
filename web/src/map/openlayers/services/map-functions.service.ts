import { LayerType } from "../constants/layers";
import { mapInstance } from "../../MapComponent";
import { availableLayers } from "../configuration/layer.configuration";

export const layerGroups = [
  [
    LayerType.OsmSwiss,
    LayerType.OsmCommon,
    LayerType.Swisstopo,
    LayerType.Satellite,
  ],
  [[LayerType.Aed247, LayerType.AedDay], LayerType.AedByOpeningHours],
];

export const enableLayer = (layerType: LayerType) => {
  const layer = availableLayers.find((layer) => layer.type === layerType);
  mapInstance.getLayers().insertAt(0, layer?.layer!);
};

export const isLayerEnabled = (layerType: LayerType) => {
  const layer = availableLayers.find((layer) => layer.type === layerType);
  return mapInstance.getLayers().getArray().includes(layer?.layer!);
};

export const disableLayer = (layerType: LayerType) => {
  const layer = availableLayers.find((layer) => layer.type === layerType);
  mapInstance.removeLayer(layer?.layer!);
};
