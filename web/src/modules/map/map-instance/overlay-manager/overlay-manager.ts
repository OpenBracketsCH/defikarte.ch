import { Map as MapInstance } from 'maplibre-gl';
import { OverlayStrategy } from '../../../../model/map';

export class OverlayManager {
  private overlays: Map<string, OverlayStrategy> = new Map();

  registerOverlay(name: string, strategy: OverlayStrategy) {
    this.overlays.set(name, strategy);
  }

  async applyOverlay(map: MapInstance, overlayName: string) {
    const strategy = this.overlays.get(overlayName);
    if (!strategy) return;

    const sourceId = strategy.getSourceId();
    const source = await strategy.createSource();
    const layers = strategy.createLayers();

    if (!map.getSource(sourceId)) {
      map.addSource(sourceId, source);
    }

    layers.forEach(layer => {
      if (!map.getLayer(layer.id)) {
        map.addLayer(layer);
      }
    });

    strategy.registerInteractions(map);
  }

  removeOverlay(map: MapInstance, overlayName: string) {
    const strategy = this.overlays.get(overlayName);
    if (!strategy) return;

    strategy.cleanup(map);
  }
}
