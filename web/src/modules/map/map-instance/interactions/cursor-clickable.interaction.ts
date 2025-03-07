import { Map, MapGeoJSONFeature, MapMouseEvent } from 'maplibre-gl';

export default class CursorClickableInteraction {
  private mapInstance: Map;

  constructor(mapInstance: Map) {
    this.mapInstance = mapInstance;
  }

  public setup = (layerIds: string[]): void => {
    this.mapInstance.on('mouseenter', layerIds, this.mouseenter);
    this.mapInstance.on('mouseleave', layerIds, this.mouseleave);
  };

  private mouseenter = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    e.target.getCanvas().style.cursor = 'pointer';
  };

  private mouseleave = (e: MapMouseEvent & { features?: MapGeoJSONFeature[] }) => {
    e.target.getCanvas().style.cursor = '';
  };
}
