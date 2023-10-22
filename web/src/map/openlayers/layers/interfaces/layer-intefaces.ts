import { Feature, Map } from "ol";
import { Point } from "ol/geom";
import Interaction from "ol/interaction/Interaction";

export interface DataLayer {
  setData(data: Feature<Point>[]): void;
}

export interface InteractiveLayer {
  getInteractions(
    callback: (features: Feature<Point>[]) => void
  ): Interaction[];
}

export interface MapEventLayer {
  registerEvents(map: Map): void;
}
