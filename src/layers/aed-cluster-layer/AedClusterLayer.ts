import { Feature } from "ol";
import Map from "ol/Map.js";
import { click } from "ol/events/condition";
import { boundingExtent } from "ol/extent";
import { Geometry, Point } from "ol/geom";
import Select from "ol/interaction/Select";
import VectorLayer from "ol/layer/Vector";
import { Cluster } from "ol/source.js";
import VectorSource from "ol/source/Vector";
import {
  clusterPointStyle,
  selectedPointStyle,
} from "../../styles/aed-point.style";
import { LayerProps } from "../props";

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

export class AedClusterLayer extends VectorLayer<Cluster> {
  constructor({ minZoom, maxZoom }: LayerProps) {
    super({
      minZoom,
      maxZoom,
      source: createClusterSource([]),
      style: clusterPointStyle,
    });
  }

  public setData(data: Feature<Point>[]) {
    this.setSource(createClusterSource(data));
    this.setStyle(clusterPointStyle);
  }

  public addSelectFeatureInteraction(map: Map) {
    const selectFeatures = new Select({
      condition: click,
      layers: [this],
      style: selectedPointStyle,
      filter: (feature) => {
        return feature.getProperties().features?.length == 1;
      },
    });

    map.addInteraction(selectFeatures);
    selectFeatures.on("select", (e) => {
      const detailElement = document.getElementById("detail");
      detailElement!.innerHTML = "";
      if (e.selected.length > 0) {
        const props = e.selected[0].getProperties().features[0].getProperties();
        detailElement!.hidden = false;
        for (let key in props) {
          if (key === "geometry") continue;
          const propHeaderElement = document.createElement("h4");
          const propContentElement = document.createElement("p");
          propHeaderElement.innerText = key;
          propContentElement.innerText = props[key];
          detailElement!.appendChild(propHeaderElement);
          detailElement!.appendChild(propContentElement);
        }
      } else {
        detailElement!.hidden = true;
      }
    });
  }

  public addClusterZoom(map: Map) {
    map.on("click", (e) => {
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
    });
  }
}
