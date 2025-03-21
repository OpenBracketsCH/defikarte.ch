import { LayerSpecification, Map } from 'maplibre-gl';
import { OverlayStrategy } from '../../../../model/map';
import { createUserLocationSource } from '../sources/user-location.source';
import { FeatureCollection } from 'geojson';
import { createUserLocationLayers } from '../layers/user-location.layer';
import { MapConfiguration } from '../configuration/map.configuration';

export class UserLocationOverlayStrategy implements OverlayStrategy {
  getSourceId() {
    return MapConfiguration.userLocationSourceId;
  }

  createSource() {
    return Promise.resolve(
      createUserLocationSource({ type: 'FeatureCollection', features: [] } as FeatureCollection)
    );
  }
  
  createLayers(): LayerSpecification[] {
    return createUserLocationLayers(
      MapConfiguration.userLocationLayerId,
      MapConfiguration.userLocationSourceId
    );
  }

  createInteractions() {
    return [];
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
