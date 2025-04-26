import { FeatureCollection, GeoJsonProperties, Point } from 'geojson';
import { GeoJSONSource, Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import { InteractionLayer, MapEventCallback } from '../../../../model/map';
import { MapConfiguration } from '../configuration/map.configuration';

export default class ItemMoveInteraction implements InteractionLayer {
  private mapInstance: Map;
  private moveFeatureId: { [key: string]: string | number | null } = {
    [MapConfiguration.aedCreateSourceId]: 123456,
  };
  private onEvent?: MapEventCallback;

  constructor(mapInstance: Map, sourceId: string, onEvent?: MapEventCallback) {
    this.mapInstance = mapInstance;
    this.sourceId = sourceId;
    this.onEvent = onEvent;
  }

  public readonly sourceId: string;

  public on = (): void => {
    this.mapInstance.on('click', e => this.setFeaturePositionMapEvent(e));
  };

  public off = (): void => {
    this.mapInstance.off('click', e => this.setFeaturePositionMapEvent(e));
  };

  public setFeaturePosition = async (
    featureId: number | string | undefined | null,
    coordinates: number[]
  ) => {
    if (!featureId) {
      console.warn('FeatureId is undefined or null');
      return;
    }

    this.moveFeatureId[this.sourceId] = featureId;
    const source = this.mapInstance.getSource(this.sourceId) as GeoJSONSource;
    if (!source) {
      console.warn('Source not found');
      return;
    }

    const geojson = (await source.getData()) as FeatureCollection<Point, GeoJsonProperties>;
    const feature = geojson.features.find(f => f.id === featureId);
    if (!feature) {
      console.warn('Feature not found');
      return;
    }

    feature.geometry.coordinates = coordinates;
    source.setData(geojson);

    this.onEvent?.({
      type: 'item-move',
      source: this.sourceId,
      data: feature,
    });
  };

  private setFeaturePositionMapEvent = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    this.setFeaturePosition(this.moveFeatureId[this.sourceId], e.lngLat.toArray());
  };
}
