import { LayerSpecification, Map } from 'maplibre-gl';
import { InteractionLayer, OverlayStrategy } from '../../../../model/map';
import { requestAedDataByCurrentAvailability } from '../../../../services/aed-data.service';
import { MapConfiguration } from '../configuration/map.configuration';
import ClusterZoomInteraction from '../interactions/cluster-zoom.interaction';
import CursorClickableInteraction from '../interactions/cursor-clickable.interaction';
import ItemSelectInteraction from '../interactions/item-select.interaction';
import { createAedClusterLayers } from '../layers/aed-cluster.layer';
import { createAedPointLayers } from '../layers/aed-point.layer';
import { createAedSource } from '../sources/aed.source';

export class AedAvailabilityOverlayStrategy implements OverlayStrategy {
  private interactions: InteractionLayer[] = [];
  getSourceId() {
    return MapConfiguration.aedAvailabilitySourceId;
  }

  async createSource() {
    const data = await requestAedDataByCurrentAvailability();
    return createAedSource(data);
  }

  createLayers(): LayerSpecification[] {
    const aedPointLayers = createAedPointLayers(
      MapConfiguration.aedAvailabilityPointLayerId,
      MapConfiguration.aedAvailabilitySourceId
    );
    const aedClusterLayers = createAedClusterLayers(
      MapConfiguration.aedAvailabilityPointLayerId,
      MapConfiguration.aedAvailabilitySourceId
    );

    return [...aedPointLayers, ...aedClusterLayers];
  }

  createInteractions(map: Map) {
    const cursorClickableInteraction = new CursorClickableInteraction(map);
    const clusterZoomInteraction = new ClusterZoomInteraction(map);
    const aedSelectInteraction = new ItemSelectInteraction(map);

    const interactions = [cursorClickableInteraction, clusterZoomInteraction, aedSelectInteraction];
    this.interactions = interactions;

    return interactions;
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

    this.interactions.forEach(interaction => {
      interaction.off();
    });
  }
}
