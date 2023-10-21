import {
  LayerConfiguration,
  LayerType,
} from "../configuration/layer.configuration";

export class LayerMangaerService {
  public availableLayers: LayerConfiguration[];

  constructor(availableLayers: LayerConfiguration[]) {
    this.availableLayers = availableLayers;
  }

  public enableLayer(layerType: LayerType) {
    this.setLayerVisibility(layerType, true);
  }

  public disableLayer(layerType: LayerType) {
    this.setLayerVisibility(layerType, false);
  }

  setLayerVisibility(layerType: LayerType, visible: boolean) {
    const layer = this.availableLayers.find(
      (layer) => layer.type === layerType
    );
    layer?.layer?.setVisible(visible);
  }
}
