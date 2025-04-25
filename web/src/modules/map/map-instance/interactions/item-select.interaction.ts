import { Point } from 'geojson';
import { Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import { InteractionLayer, MapEventCallback } from '../../../../model/map';
import { FEATURE_STATE } from '../configuration/constants';

export default class ItemSelectInteraction implements InteractionLayer {
  private mapInstance: Map;
  private layerIds: string[] = [];
  private selectedFeatureId: { [key: string]: number | null } = {};
  private onEvent?: MapEventCallback;

  constructor(mapInstance: Map, onEvent?: MapEventCallback) {
    this.mapInstance = mapInstance;
    this.onEvent = onEvent;
  }

  public on = (layerIds: string[]): void => {
    this.layerIds = layerIds;
    this.mapInstance.on('click', e => this.deselectFeature(e));
    this.mapInstance.on('click', this.layerIds, e => this.selectFeature(e));
  };

  public off = (): void => {
    this.mapInstance.off('click', e => this.deselectFeature(e));
    this.mapInstance.off('click', this.layerIds, this.selectFeature);
    this.layerIds = [];
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

    this.mapInstance.setFeatureState(
      { source: source, id: featureId },
      { [FEATURE_STATE.SELECTED]: true }
    );
    this.selectedFeatureId[source] = (featureId as number) ?? null;

    this.onEvent?.({
      type: 'item-select',
      source: source,
      layerIds: this.layerIds,
      data: e.features[0],
    });
  };

  private deselectFeature = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }): void => {
    if (e.features?.length) {
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
          { [FEATURE_STATE.SELECTED]: false }
        );
      }
    });

    this.onEvent?.({
      type: 'item-select',
      layerIds: this.layerIds,
      data: null,
    });
  };
}
