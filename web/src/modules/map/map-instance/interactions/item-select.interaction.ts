import { Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import { InteractionLayer } from '../../../../model/map';
import { FEATURE_STATE } from '../configuration/constants';
import { Point } from 'geojson';

export default class ItemSelectInteraction implements InteractionLayer {
  private mapInstance: Map;
  private layerIds: string[] = [];
  private selectedFeatureId: { [key: string]: number | null } = {};

  constructor(mapInstance: Map) {
    this.mapInstance = mapInstance;
    this.mapInstance.on('click', e => this.unselectFeature(e));
  }

  public on = (layerIds: string[]): void => {
    this.layerIds = layerIds;
    this.mapInstance.on('click', this.layerIds, e => this.selectFeature(e));
  };

  public off = (): void => {
    this.mapInstance.off('click', this.layerIds, this.selectFeature);
  };

  private selectFeature = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    if (!e || !e.features) {
      return;
    }

    const coordinates = (e.features[0].geometry as Point).coordinates;
    const source = e.features[0].source;
    const zoom = this.mapInstance.getZoom();
    this.mapInstance.easeTo({
      center: [coordinates[0], coordinates[1]],
      zoom,
    });

    const featureId = e.features[0].id;
    if (this.selectedFeatureId[source]) {
      this.mapInstance.setFeatureState(
        {
          source: source,
          id: this.selectedFeatureId[source],
        },
        { [FEATURE_STATE.SELECTED]: false }
      );
    }

    this.mapInstance.setFeatureState({ source: source, id: featureId }, { selected: true });
    this.selectedFeatureId[source] = (featureId as number) ?? null;
  };

  private unselectFeature = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }): void => {
    const features = this.mapInstance.queryRenderedFeatures(e.point, {
      layers: this.layerIds,
    });

    if (features.length) {
      return;
    }

    this.layerIds.forEach(layerId => {
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
