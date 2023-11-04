import { Feature, MapBrowserEvent } from 'ol';
import Map from 'ol/Map.js';
import { boundingExtent } from 'ol/extent';
import { Geometry, Point } from 'ol/geom';
import Interaction from 'ol/interaction/Interaction';
import VectorLayer from 'ol/layer/Vector';
import { Cluster } from 'ol/source.js';
import VectorSource from 'ol/source/Vector';
import { StyleLike } from 'ol/style/Style';
import { FlatStyleLike } from 'ol/style/flat';
import { DataLayer, InteractiveLayer, MapEventLayer } from '../interfaces/layer-intefaces';
import { selectInteraction } from './aed-layer-interactions';
import { clusterPointStyle } from '../../styles/aed-point.style';

const createClusterSource = (data: Feature<Point>[]) => {
  return new Cluster({
    distance: 80,
    minDistance: 20,
    source: new VectorSource<Point>({
      features: data,
    }),
    createCluster: (arg0: Point, arg1: Feature<Geometry>[]): Feature<Geometry> => {
      const clusterFeatures = new Feature<Point>({
        geometry: arg0,
      });

      clusterFeatures.set('features', arg1);
      return clusterFeatures;
    },
  });
};

type LayerProps = {
  minZoom?: number;
  maxZoom?: number;
  style?: StyleLike | FlatStyleLike | null | undefined;
  dataFilter?: (data: Feature<Point>[]) => Feature<Point>[];
  zIndex?: number;
};

export class AedClusterLayer
  extends VectorLayer<Cluster>
  implements InteractiveLayer, DataLayer, MapEventLayer
{
  private style?: StyleLike | FlatStyleLike | null | undefined;
  private dataFilter?: (data: Feature<Point>[]) => Feature<Point>[];

  constructor({
    minZoom,
    maxZoom,
    style = clusterPointStyle,
    dataFilter,
    zIndex = 10,
  }: LayerProps) {
    super({
      minZoom,
      maxZoom,
      style: style,
      source: createClusterSource([]),
      zIndex,
    });

    this.style = style;
    this.dataFilter = dataFilter;
  }

  public setData(data?: Feature<Point>[]) {
    if (!data) {
      return;
    }
    if (this.dataFilter) {
      data = this.dataFilter(data);
    }
    this.setSource(createClusterSource(data));
    this.setStyle(this.style);
  }

  public getInteractions(callback: (features: Feature<Point>[]) => void): Interaction[] {
    return [selectInteraction([this], callback)];
  }

  public registerEvents(map: Map): void {
    map.on('click', this.onClusterElemenClick(map));
  }

  private onClusterElemenClick(map: Map) {
    return (e: MapBrowserEvent<UIEvent>) => {
      this.getFeatures(e.pixel).then(clickedFeatures => {
        if (clickedFeatures.length) {
          // Get clustered Coordinates
          const features = clickedFeatures[0].get('features');
          if (features.length > 1) {
            const extent = boundingExtent(
              features.map((r: any) => r.getGeometry().getCoordinates())
            );
            map.getView().fit(extent, { duration: 500, padding: [50, 50, 50, 50] });
          }
        }
      });
    };
  }
}
