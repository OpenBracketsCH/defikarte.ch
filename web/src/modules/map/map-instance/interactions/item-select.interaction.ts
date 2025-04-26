import { Point } from 'geojson';
import { Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import { InteractionLayer, MapEventCallback } from '../../../../model/map';
import { FEATURE_STATE } from '../configuration/constants';

export default class ItemSelectInteraction implements InteractionLayer {
  private mapInstance: Map;
  private layerIds: string[] = [];
  private selectedFeatureId: { [key: string]: number | null } = {};
  private onEvent?: MapEventCallback;

  constructor(mapInstance: Map, sourceId: string, onEvent?: MapEventCallback) {
    this.mapInstance = mapInstance;
    this.sourceId = sourceId;
    this.onEvent = onEvent;
  }

  public readonly sourceId: string;

  public on = (layerIds: string[]): void => {
    this.layerIds = layerIds;
    this.mapInstance.on('click', e => this.deselectFeaturesMapEvent(e));
    this.mapInstance.on('click', this.layerIds, e => this.selectFeatureMapEvent(e));
  };

  public off = (): void => {
    this.mapInstance.off('click', e => this.deselectFeaturesMapEvent(e));
    this.mapInstance.off('click', this.layerIds, this.selectFeatureMapEvent);
    this.layerIds = [];
    this.selectedFeatureId = {};
    this.deselectFeatures();
  };

  public selectFeature = (feature: MapGeoJSONFeature, zoom: number | null = null): void => {
    const source = feature.source;
    if (this.sourceId !== source) {
      console.warn('Feature source does not match the interaction sourceId');
      return;
    }

    if (this.selectedFeatureId[this.sourceId]) {
      this.deselectFeatures();
    }

    if (!zoom && feature.geometry.bbox) {
      const bbox = feature.geometry.bbox;
      this.mapInstance.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ]);
    } else {
      const coordinates = (feature.geometry as Point).coordinates;
      this.mapInstance.easeTo({
        center: [coordinates[0], coordinates[1]],
        zoom: zoom ?? 18,
      });
    }

    const featureId = feature.id;
    this.mapInstance.setFeatureState(
      { source: source, id: featureId },
      { [FEATURE_STATE.SELECTED]: true }
    );
    this.selectedFeatureId[source] = (featureId as number) ?? null;

    this.onEvent?.({
      type: 'item-select',
      source: source,
      layerIds: this.layerIds,
      data: feature,
    });
  };

  public deselectFeatures = (): void => {
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

        this.selectedFeatureId[source] = null;
      }
    });

    this.onEvent?.({
      type: 'item-select',
      layerIds: this.layerIds,
      data: null,
    });
  };

  private selectFeatureMapEvent = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    if (!e || !e.features) {
      return;
    }
    const feature = e.features[0];

    this.selectFeature(feature, this.mapInstance.getZoom());
  };

  private deselectFeaturesMapEvent = (
    e: MapMouseEvent & { features?: MapGeoJSONFeature[] }
  ): void => {
    if (e.features?.length) {
      return;
    }

    this.deselectFeatures();
  };
}
