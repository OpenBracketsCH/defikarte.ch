import { GeoJSONSource, LayerSpecification, Map } from 'maplibre-gl';
import {
  InteractionLayer,
  MapEventCallback,
  OverlayStrategy,
  RefreshableOverlayStrategy,
} from '../../../../../model/map';
import { requestAedDataByCurrentAvailability } from '../../../../../services/aed-data.service';
import { MapConfiguration } from '../../configuration/map.configuration';
import ClusterZoomInteraction from '../../interactions/cluster-zoom.interaction';
import CursorClickableInteraction from '../../interactions/cursor-clickable.interaction';
import ItemSelectInteraction from '../../interactions/item-select.interaction';
import { createAedAvailabilityPointLayers } from '../../layers/aed-availability-point.layer';
import { createAedClusterLayers } from '../../layers/aed-cluster.layer';
import { createAedSource } from '../../sources/aed.source';

export class AedAvailabilityOverlayStrategy implements OverlayStrategy, RefreshableOverlayStrategy {
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

  async refreshSourceData(map: Map): Promise<void> {
    const source = map.getSource(this.getSourceId()) as GeoJSONSource;
    if (!source) {
      console.warn('Source not found', this.getSourceId());
      return;
    }

    const data = await requestAedDataByCurrentAvailability();
    source.setData(data);
  }

  createLayers(): LayerSpecification[] {
    const aedPointLayers = createAedAvailabilityPointLayers(
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

  registerInteractions(map: Map, onEvent?: MapEventCallback) {
    const layers = [
      ...this.aedPointLayers.map(layer => layer.id),
      ...this.aedClusterLayers.map(layer => layer.id),
    ];
    const cursorClickableInteraction = new CursorClickableInteraction(map, layers);
    const clusterZoomInteraction = new ClusterZoomInteraction(
      map,
      this.aedClusterLayers.map(layer => layer.id)
    );
    const itemSelectInteraction = new ItemSelectInteraction(
      map,
      this.getSourceId(),
      this.aedPointLayers.map(layer => layer.id),
      onEvent
    );

    this.interactions = [cursorClickableInteraction, clusterZoomInteraction, itemSelectInteraction];

    cursorClickableInteraction.on();
    clusterZoomInteraction.on();
    itemSelectInteraction.on();
  }

  getInteractions() {
    return this.interactions as readonly InteractionLayer[];
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
