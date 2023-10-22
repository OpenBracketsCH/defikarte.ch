import { Feature, MapBrowserEvent } from "ol";
import Map from "ol/Map.js";
import { boundingExtent } from "ol/extent";
import { Geometry, Point } from "ol/geom";
import Interaction from "ol/interaction/Interaction";
import VectorLayer from "ol/layer/Vector";
import { Cluster } from "ol/source.js";
import VectorSource from "ol/source/Vector";
import { clusterPointStyle } from "../../styles/aed-point.style";
import {
  DataLayer,
  InteractiveLayer,
  MapEventLayer,
} from "../interfaces/layer-intefaces";
import { LayerProps } from "../props";
import { selectInteraction } from "./aed-layer-interactions";

const createClusterSource = (data: Feature<Point>[]) => {
  return new Cluster({
    distance: 80,
    minDistance: 20,
    source: new VectorSource<Point>({
      features: data,
    }),
    createCluster: (
      arg0: Point,
      arg1: Feature<Geometry>[]
    ): Feature<Geometry> => {
      const clusterFeatures = new Feature<Point>({
        geometry: arg0,
      });

      clusterFeatures.set("features", arg1);
      return clusterFeatures;
    },
  });
};

export class AedClusterLayer
  extends VectorLayer<Cluster>
  implements InteractiveLayer, DataLayer, MapEventLayer
{
  constructor({ minZoom, maxZoom }: LayerProps) {
    super({
      minZoom,
      maxZoom,
      style: clusterPointStyle,
      source: createClusterSource([]),
    });
  }

  public setData(data: Feature<Point>[]) {
    this.setSource(createClusterSource(data));
    this.setStyle(clusterPointStyle);
  }

  public getInteractions(
    callback: (features: Feature<Point>[]) => void
  ): Interaction[] {
    return [selectInteraction([this], callback)];
  }

  public registerEvents(map: Map): void {
    map.on("click", this.onClusterElemenClick(map));
  }

  private onClusterElemenClick(map: Map) {
    return (e: MapBrowserEvent<UIEvent>) => {
      this.getFeatures(e.pixel).then((clickedFeatures) => {
        if (clickedFeatures.length) {
          // Get clustered Coordinates
          const features = clickedFeatures[0].get("features");
          if (features.length > 1) {
            const extent = boundingExtent(
              features.map((r: any) => r.getGeometry().getCoordinates())
            );
            map
              .getView()
              .fit(extent, { duration: 500, padding: [50, 50, 50, 50] });
          }
        }
      });
    };
  }
}
