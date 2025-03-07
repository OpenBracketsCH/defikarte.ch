import { Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';

export default class AedSelectInteraction {
  private mapInstance: Map;
  private selectedFeatureId: { [key: string]: number | null } = {};

  constructor(mapInstance: Map) {
    this.mapInstance = mapInstance;
  }

  public setup = (layerIds: string[]): void => {
    this.mapInstance.on('click', layerIds, e => this.selectFeature(e));
    this.mapInstance.on('click', e => this.unselectFeature(e, layerIds));
  };

  private selectFeature = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    if (!e || !e.features) {
      return;
    }

    const source = e.features[0].source;
    const zoom = this.mapInstance.getZoom();
    this.mapInstance.easeTo({
      center: e.features[0].toJSON()['geometry']['coordinates'],
      zoom,
    });
    const featureId = e.features[0].id;
    if (this.selectedFeatureId[source]) {
      this.mapInstance.setFeatureState(
        {
          source: source,
          id: this.selectedFeatureId[source],
        },
        { selected: false }
      );
    }

    this.mapInstance.setFeatureState({ source: source, id: featureId }, { selected: true });
    this.selectedFeatureId[source] = (featureId as number) ?? null;
  };

  private unselectFeature = (
    e: MapMouseEvent & { features?: MapGeoJSONFeature[] },
    layerIds: string[]
  ): void => {
    const features = this.mapInstance.queryRenderedFeatures(e.point, {
      layers: layerIds,
    });

    if (features.length) {
      return;
    }

    layerIds.forEach(layerId => {
      const source = this.mapInstance.getLayer(layerId)?.source;
      if (source && this.selectedFeatureId[source]) {
        this.mapInstance.setFeatureState(
          {
            source: source,
            id: this.selectedFeatureId[source],
          },
          { selected: false }
        );
      }
    });
  };
}
