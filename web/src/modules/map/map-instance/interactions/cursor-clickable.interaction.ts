import { Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';
import { InteractionLayer } from '../../../../model/map';

export default class CursorClickableInteraction implements InteractionLayer {
  private mapInstance: Map;
  private layerIds: string[] = [];

  constructor(mapInstance: Map) {
    this.mapInstance = mapInstance;
  }

  public on = (layerIds: string[]): void => {
    this.layerIds = layerIds;
    this.mapInstance.on('mouseenter', this.layerIds, this.mouseenter);
    this.mapInstance.on('mouseleave', this.layerIds, this.mouseleave);
  };

  public off = (): void => {
    this.mapInstance.off('mouseenter', this.layerIds, this.mouseenter);
    this.mapInstance.off('mouseleave', this.layerIds, this.mouseleave);
    this.layerIds = [];
  };

  private mouseenter = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    e.target.getCanvas().style.cursor = 'pointer';
  };

  private mouseleave = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    e.target.getCanvas().style.cursor = '';
  };
}
