import { GeoJSONSource, Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';

export default class ClusterZoomInteraction {
  private mapInstance: Map;

  constructor(mapInstance: Map) {
    this.mapInstance = mapInstance;
  }

  public setup = (layerIds: string[]): void => {
    this.mapInstance.on('click', layerIds, this.zoomToCluster);
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
