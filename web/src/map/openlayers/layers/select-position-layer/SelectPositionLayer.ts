import { MapBrowserEvent } from "ol";
import Feature from "ol/Feature";
import Map from "ol/Map.js";
import { Point } from "ol/geom";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import { Icon, Style } from "ol/style";
import marker from "../../assets/select-marker.png";
import { MapEventLayer } from "../interfaces/layer-intefaces";

export class SelectPositionLayer
  extends VectorLayer<VectorSource<Point>>
  implements MapEventLayer
{
  private feature: Feature<Point> = new Feature<Point>({
    geometry: new Point([0, 0]),
  });
  constructor() {
    super({
      source: new VectorSource<Point>({
        features: [],
      }),
      style: new Style({
        image: new Icon({
          src: marker,
          anchor: [0.5, 1],
        }),
      }),
    });

    this.feature = new Feature<Point>({
      geometry: new Point([0, 0]),
    });
    this.getSource()?.addFeature(this.feature);
  }

  public registerEvents(map: Map): void {
    map.on("click", this.onClusterElemenClick(map));
  }

  private onClusterElemenClick(map: Map) {
    return (e: MapBrowserEvent<UIEvent>) => {
      console.log(e.coordinate);
    };
  }
}
