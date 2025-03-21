import { FeatureCollection } from 'geojson';
import { LayerSpecification, Map } from 'maplibre-gl';
import { OverlayStrategy } from '../../../../model/map';
import { MapConfiguration } from '../configuration/map.configuration';
import { createUserLocationLayers } from '../layers/user-location.layer';
import { createUserLocationSource } from '../sources/user-location.source';

export class UserLocationOverlayStrategy implements OverlayStrategy {
  getSourceId() {
    return MapConfiguration.userLocationSourceId;
  }

  createSource() {
    return createUserLocationSource({
      type: 'FeatureCollection',
      features: [],
    } as FeatureCollection);
  }

  createLayers(): LayerSpecification[] {
    return createUserLocationLayers(
      MapConfiguration.userLocationLayerId,
      MapConfiguration.userLocationSourceId
    );
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
