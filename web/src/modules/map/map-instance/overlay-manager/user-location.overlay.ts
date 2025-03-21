import { FeatureCollection } from 'geojson';
import { GeoJSONSource, LayerSpecification, Map } from 'maplibre-gl';
import { OverlayStrategy } from '../../../../model/map';
import { MapConfiguration } from '../configuration/map.configuration';
import { createUserLocationLayers } from '../layers/user-location.layer';
import { createUserLocationSource } from '../sources/user-location.source';

export class UserLocationOverlayStrategy implements OverlayStrategy {
  private map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  getSourceId() {
    return MapConfiguration.userLocationSourceId;
  }

  async createSource() {
    const source = this.map.getSource(this.getSourceId()) as GeoJSONSource;
    let data: GeoJSON.GeoJSON = {
      type: 'FeatureCollection',
      features: [],
    } as FeatureCollection;
    if (source) {
      data = await source.getData();
    }

    return createUserLocationSource(data);
  }

  createLayers(): LayerSpecification[] {
    return createUserLocationLayers(MapConfiguration.userLocationLayerId, this.getSourceId());
  }

  registerInteractions() {
    // No interactions for user location
  }

  cleanup(map: Map) {
    const layers = this.createLayers();
    layers.forEach(layer => {
      if (map.getLayer(layer.id)) {
        map.removeLayer(layer.id);
      }
    });
    if (map.getSource(this.getSourceId())) {
      map.removeSource(this.getSourceId());
    }
  }
}
