import Interaction from "ol/interaction/Interaction";
import { Feature } from "ol";
import { Point } from "ol/geom";

export interface DataLayer {
  setData(data: Feature<Point>[]): void;
}

export interface InteractiveLayer {
  getInteractions(): Interaction[];
}
