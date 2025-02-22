import axios from "axios";
import { Map, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import { LayerConfiguration } from "./configuration/layer.configuration";
import { MapConfiguration } from "./configuration/map.configuration";
import { createAedLayerSpec } from "./layers/aed.layers";

export class MapInstance {
  private mapInstance: Map;
  // private activeOverlays: string[] = [];

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

  public setBaseLayer = async (layerId: string) => {
    let layerStyle = MapConfiguration.baseLayers[layerId];

    if (!layerStyle) {
      return;
    }

    // todo: aed layers have to be added dynamically
    layerStyle = await this.applyActiveOverlays(layerStyle);
    this.mapInstance.setStyle(layerStyle, { diff: true });
  };

  public remove = () => {
    this.mapInstance.remove();
  };

  private applyActiveOverlays = async (
    layerStyle: string | StyleSpecification
  ): Promise<StyleSpecification> => {
    let styleSpec: StyleSpecification | null = null;
    if (typeof layerStyle === "string") {
      try {
        const response = await axios.get<StyleSpecification>(layerStyle);
        styleSpec = response.data;
      } catch (e) {
        console.error(e);
      }
    } else {
      styleSpec = layerStyle;
    }

    if (!styleSpec) {
      return {} as StyleSpecification;
    }

    return {
      ...styleSpec,
      sources: {
        ...styleSpec.sources,
        [LayerConfiguration.aedLayerSource]: MapConfiguration.aedSourceSpec,
      },
      layers: [...styleSpec.layers, createAedLayerSpec()],
    } as StyleSpecification;
  };
}
