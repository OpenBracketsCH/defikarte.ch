import { Feature } from "ol";
import Map from "ol/Map.js";
import View from "ol/View.js";
import { defaults as defaultControls } from "ol/control.js";
import { Point } from "ol/geom";
import Interaction from "ol/interaction/Interaction";
import { LayerConfiguration } from "./configuration/layer.configuration";

const isInteractive = (layer: any): boolean => {
  return layer?.getInteractions !== undefined;
};

const isDataLayer = (layer: any): boolean => {
  return layer?.setData !== undefined;
};

export class MapInstance {
  private mapInstance: Map;
  private availableLayers: LayerConfiguration[];

  constructor(availableLayers: LayerConfiguration[]) {
    this.availableLayers = availableLayers;
    this.mapInstance = new Map({
      layers: [],
      controls: defaultControls({ zoom: false }),
      view: new View({
        center: [905000, 5900000], // todo: save last view in local storage
        zoom: 8,
      }),
    });
  }

  public initMap = () => {
    this.loadLayers();
    this.loadInteractions();
  };

  public disposeMap = () => {
    this.mapInstance.getLayers().clear();
    this.mapInstance.getOverlays().clear();
  };

  public setTarget = (target: string | HTMLElement) => {
    this.mapInstance.setTarget(target);
  };

  public loadInteractions = () => {
    this.availableLayers.forEach((x) => {
      if (isInteractive(x.layer)) {
        x.layer
          .getInteractions()
          .forEach((i: Interaction) => this.mapInstance.addInteraction(i));
      }
    });
  };

  public initializeData = (data: Feature<Point>[]) => {
    this.availableLayers.forEach((x) => {
      if (isDataLayer(x.layer)) {
        x.layer.setData(data);
      }
    });
  };

  private loadLayers = () => {
    this.availableLayers
      .sort((x) => x.priority)
      .forEach((x) => {
        if (x.layer) {
          this.mapInstance.addLayer(x.layer);
        }
      });
    this.mapInstance.getLayers().forEach((layer) => layer.setVisible(false));
  };
}
