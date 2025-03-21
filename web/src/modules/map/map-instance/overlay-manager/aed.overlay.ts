import { FilterSpecification, LayerSpecification, Map } from 'maplibre-gl';
import { InteractionLayer, OverlayStrategy } from '../../../../model/map';
import { MapConfiguration } from '../configuration/map.configuration';
import ClusterZoomInteraction from '../interactions/cluster-zoom.interaction';
import CursorClickableInteraction from '../interactions/cursor-clickable.interaction';
import ItemSelectInteraction from '../interactions/item-select.interaction';
import { createAedClusterLayers } from '../layers/aed-cluster.layer';
import { createAedPointLayers } from '../layers/aed-point.layer';
import { createAedSource } from '../sources/aed.source';

export class AedOverlayStrategy implements OverlayStrategy {
  private interactions: InteractionLayer[] = [];
  private filter: FilterSpecification | null = null;

  constructor(filter: FilterSpecification | null = null) {
    this.filter = filter;
  }

  getSourceId() {
    return MapConfiguration.aedSourceId;
  }

  createSource() {
    return createAedSource(MapConfiguration.aedGeoJsonUrl, this.filter);
  }

  createLayers(): LayerSpecification[] {
    const aedPointLayers = createAedPointLayers(
      MapConfiguration.aedPointLayerId,
      MapConfiguration.aedSourceId
    );
    const aedClusterLayers = createAedClusterLayers(
      MapConfiguration.aedPointLayerId,
      MapConfiguration.aedSourceId
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
