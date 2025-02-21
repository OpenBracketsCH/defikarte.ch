import { Map } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LayerConfiguration } from "./configuration/layer.configuration";
import { MapConfiguration } from "./configuration/map.configuration";
import { createAedLayerSpec } from "./layers/aed.layers";

export class MapInstance {
  private mapInstance: Map;

  constructor(container: string | HTMLElement) {
    this.mapInstance = new Map({
      container: container,
      style: MapConfiguration.defaultStyle,
      center: MapConfiguration.defaultCenter,
      zoom: MapConfiguration.defaultZoom,
    });

    this.mapInstance.on("load", this.init);
  }

  public init = () => {
    // this is not included in the base json from swisstopo. probably create a custom or extend the existing one dynamically
    this.mapInstance.addSource(
      LayerConfiguration.aedLayerSource,
      MapConfiguration.aedSourceSpec
    );

    this.mapInstance.addLayer(createAedLayerSpec());
  };

  public setBaseLayer = (layerId: string) => {
    const layerStyle = MapConfiguration.baseLayers[layerId];

    if (!layerStyle) {
      return;
    }

    // todo: aed layers have to be added dynamically
    this.mapInstance.setStyle(layerStyle, { diff: true });
  };

  public remove = () => {
    this.mapInstance.remove();
  };
}
