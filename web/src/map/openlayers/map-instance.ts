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

const isEventLayer = (layer: any): boolean => {
  return layer?.registerEvents !== undefined;
};

const isDataLayer = (layer: any): boolean => {
  return layer?.setData !== undefined;
};

type Options = {
  layerConfiguration: LayerConfiguration[];
};

export class MapInstance {
  private mapInstance: Map;
  private availableLayers: LayerConfiguration[];

  constructor(options: Options) {
    this.availableLayers = options.layerConfiguration;
    this.mapInstance = new Map({
      layers: [],
      controls: defaultControls({ zoom: false }),
      view: new View({
        center: [905000, 5900000], // todo: save last view in local storage
        zoom: 8,
      }),
    });

    this.initializeLayers();
    this.initializeEvents();
  }

  public setTarget = (target: string | HTMLElement) => {
    this.mapInstance.setTarget(target);
  };

  public initializeClickInteraction = (
    callback: (features: Feature<Point>[]) => void
  ) => {
    this.availableLayers.forEach((x) => {
      if (isInteractive(x.layer)) {
        const interactions = x.layer.getInteractions(callback);
        interactions.forEach((interaction: Interaction) => {
          if (
            !this.mapInstance.getInteractions().getArray().includes(interaction)
          ) {
            this.mapInstance.addInteraction(interaction);
          }
        });
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

  private initializeLayers = () => {
    this.availableLayers
      .sort((a, b) => {
        return a.priority < b.priority ? -1 : a.priority > b.priority ? 1 : 0;
      })
      .forEach((x) => {
        if (x.layer) {
          this.mapInstance.addLayer(x.layer);
        }
      });
    this.mapInstance.getLayers().forEach((layer) => layer.setVisible(false));
  };

  private initializeEvents = () => {
    this.availableLayers.forEach((x) => {
      if (isEventLayer(x.layer)) {
        x.layer.registerEvents(this.mapInstance);
      }
    });
  };
}
