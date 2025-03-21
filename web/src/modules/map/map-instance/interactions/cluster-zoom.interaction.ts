import { GeoJSONSource, Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import { InteractionLayer } from '../../../../model/map';

export default class ClusterZoomInteraction implements InteractionLayer {
  private mapInstance: Map;
  private layerIds: string[] = [];

  constructor(mapInstance: Map) {
    this.mapInstance = mapInstance;
  }

  public on = (layerIds: string[]): void => {
    this.layerIds = layerIds;
    this.mapInstance.on('click', this.layerIds, this.zoomToCluster);
  };

  public off = (): void => {
    this.mapInstance.off('click', this.layerIds, this.zoomToCluster);
  };

  private zoomToCluster = async (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    const layer = e.features?.[0].layer;
    const source = e.features?.[0].source;
    if (!layer || !source) {
      return;
    }

    const features = this.mapInstance.queryRenderedFeatures(e.point, {
      layers: [layer.id],
    });

    const clusterId = features[0].properties.cluster_id;
    const zoom = await (
      this.mapInstance.getSource(source) as GeoJSONSource
    )?.getClusterExpansionZoom(clusterId);

    this.mapInstance.easeTo({
      center: features[0].toJSON()['geometry']['coordinates'],
      zoom,
    });
  };
}
