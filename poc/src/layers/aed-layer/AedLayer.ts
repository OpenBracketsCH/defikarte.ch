import { Feature } from "ol";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { pointStyle } from "../../styles/aed-point.style";
import { LayerProps } from "../props";

export class AedLayer extends VectorLayer<VectorSource<Point>> {
  constructor({ minZoom, maxZoom }: LayerProps) {
    super({
      minZoom,
      maxZoom,
      source: new VectorSource<Point>({
        features: [],
      }),
      style: pointStyle,
    });
  }

  public setData(data: Feature<Point>[]) {
    this.setSource(new VectorSource<Point>({ features: data }));
    this.setStyle(pointStyle);
  }
}
