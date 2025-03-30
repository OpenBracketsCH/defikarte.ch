import { GeoJSONSource, LayerSpecification, Map } from 'maplibre-gl';
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
  private aedPointLayers: LayerSpecification[] = [];
  private aedClusterLayers: LayerSpecification[] = [];
  private map: Map;

  constructor(map: Map) {
    this.map = map;
  }

  getSourceId() {
    return MapConfiguration.aedAvailabilitySourceId;
  }

  async createSource() {
    // optimize performance when base-layer changes and source is already loaded
    const source = this.map.getSource(this.getSourceId()) as GeoJSONSource;
    if (source) {
      return source.serialize();
    }

    // takes long, but on the backend I am not able to filter by availability
    const data = await requestAedDataByCurrentAvailability();
    return createAedSource(data);
  }

  createLayers(): LayerSpecification[] {
    const aedPointLayers = createAedPointLayers(
      MapConfiguration.aedAvailabilityPointLayerId,
      this.getSourceId()
    );
    const aedClusterLayers = createAedClusterLayers(
      MapConfiguration.aedAvailabilityPointLayerId,
      this.getSourceId()
    );

    this.aedPointLayers = aedPointLayers;
    this.aedClusterLayers = aedClusterLayers;

    return [...aedPointLayers, ...aedClusterLayers];
  }

  registerInteractions(map: Map) {
    const cursorClickableInteraction = new CursorClickableInteraction(map);
    const clusterZoomInteraction = new ClusterZoomInteraction(map);
    const itemSelectInteraction = new ItemSelectInteraction(map);

    this.interactions = [cursorClickableInteraction, clusterZoomInteraction, itemSelectInteraction];

    cursorClickableInteraction.on(this.aedPointLayers.map(layer => layer.id));
    cursorClickableInteraction.on(this.aedClusterLayers.map(layer => layer.id));
    clusterZoomInteraction.on(this.aedClusterLayers.map(layer => layer.id));
    itemSelectInteraction.on(this.aedPointLayers.map(layer => layer.id));
  }

  cleanup(map: Map) {
    const layers = [...this.aedPointLayers, ...this.aedClusterLayers];
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
