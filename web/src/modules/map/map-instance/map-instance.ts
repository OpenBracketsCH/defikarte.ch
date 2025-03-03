import { GeoJSONSource, Map, StyleSpecification } from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import markerGreen from "../../../assets/icons/defi-map-marker-green.svg";
import markerOrange from "../../../assets/icons/defi-map-marker-orange.svg";
import { requestStyleSpecification } from "../../../services/map-style.service";
import { LayerConfiguration } from "./configuration/layer.configuration";
import { MapConfiguration } from "./configuration/map.configuration";
import { createAedLayerSpec } from "./layers/aed.layers";

type MapInstanceProps = {
  container: string | HTMLElement;
};

export class MapInstance {
  private mapInstance: Map;
  private selectedFeatureId: number | null = null;
  // private activeOverlays: string[] = [];

  constructor(props: MapInstanceProps) {
    this.mapInstance = new Map({
      container: props.container,
      style: MapConfiguration.defaultStyle,
      center: MapConfiguration.defaultCenter,
      zoom: MapConfiguration.defaultZoom,
    });

    this.mapInstance.on("load", this.init);
  }

  public init = () => {
    const image = new Image();
    image.src = markerGreen;
    image.onload = () => {
      this.mapInstance.addImage("marker-green", image);
    };

    const image2 = new Image();
    image2.src = markerOrange;
    image2.onload = () => {
      this.mapInstance.addImage("marker-orange", image2);
    };

    // this is not included in the base json from swisstopo. probably create a custom or extend the existing one dynamically
    this.mapInstance.addSource(
      LayerConfiguration.aedLayerSource,
      MapConfiguration.aedSourceSpec
    );

    createAedLayerSpec().forEach((layer) => {
      this.mapInstance.addLayer(layer);
    });

    this.mapInstance.on("mouseenter", LayerConfiguration.aedLayerId, () => {
      this.mapInstance.getCanvas().style.cursor = "pointer";
    });

    // Change it back to a pointer when it leaves.
    this.mapInstance.on("mouseleave", LayerConfiguration.aedLayerId, () => {
      this.mapInstance.getCanvas().style.cursor = "";
    });

    this.mapInstance.on("click", (e) => {
      const features = this.mapInstance.queryRenderedFeatures(e.point, {
        layers: [LayerConfiguration.aedLayerId],
      });

      if (features.length === 0) {
        if (this.selectedFeatureId) {
          this.mapInstance.setFeatureState(
            {
              source: LayerConfiguration.aedLayerSource,
              id: this.selectedFeatureId,
            },
            { selected: false }
          );
        }
      }
    });

    this.mapInstance.on("click", LayerConfiguration.aedLayerId, async (e) => {
      if (!e || !e.features) {
        return;
      }

      const zoom = this.mapInstance.getZoom();
      this.mapInstance.easeTo({
        center: e.features[0].toJSON()["geometry"]["coordinates"],
        zoom,
      });

      const featureId = e.features[0].id;
      if (this.selectedFeatureId) {
        this.mapInstance.setFeatureState(
          {
            source: LayerConfiguration.aedLayerSource,
            id: this.selectedFeatureId,
          },
          { selected: false }
        );
      }
      this.mapInstance.setFeatureState(
        { source: LayerConfiguration.aedLayerSource, id: featureId },
        { selected: true }
      );

      this.selectedFeatureId = (featureId as number) ?? null;
    });

    this.mapInstance.on("click", "cluster-point", async (e) => {
      const features = this.mapInstance.queryRenderedFeatures(e.point, {
        layers: ["cluster-point"],
      });
      const clusterId = features[0].properties.cluster_id;
      const zoom = await (
        this.mapInstance.getSource(
          LayerConfiguration.aedLayerSource
        ) as GeoJSONSource
      )?.getClusterExpansionZoom(clusterId);
      this.mapInstance.easeTo({
        center: features[0].toJSON()["geometry"]["coordinates"],
        zoom,
      });
    });
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
      styleSpec = await requestStyleSpecification(layerStyle);
    } else {
      styleSpec = layerStyle;
    }

    if (!styleSpec) {
      return { layers: {}, sources: {}, version: 8 } as StyleSpecification;
    }

    return {
      ...styleSpec,
      sources: {
        ...styleSpec.sources,
        [LayerConfiguration.aedLayerSource]: MapConfiguration.aedSourceSpec,
      },
      layers: [...styleSpec.layers, ...createAedLayerSpec()],
    } as StyleSpecification;
  };
}
