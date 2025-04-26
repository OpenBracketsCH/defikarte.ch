import { Map as MapInstance, StyleSpecification } from 'maplibre-gl';
import { InteractionLayer, MapEventCallback, OverlayStrategy } from '../../../../model/map';

export class OverlayManager {
  private overlays: Map<string, OverlayStrategy> = new Map();
  private activeOverlays: string[] = [];
  private onEvent: MapEventCallback | undefined;

  constructor(onEvent?: MapEventCallback) {
    this.onEvent = onEvent;
  }

  registerOverlay(name: string, strategy: OverlayStrategy) {
    this.overlays.set(name, strategy);
  }

  async applyOverlay(map: MapInstance, overlayName: string): Promise<void> {
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

    strategy.registerInteractions(map, this.onEvent);
    this.activeOverlays.push(overlayName);
  }

  async applyOverlayOnStyle(
    overlayName: string,
    style: StyleSpecification
  ): Promise<StyleSpecification> {
    const strategy = this.overlays.get(overlayName);
    if (!strategy) return style;

    const sourceId = strategy.getSourceId();
    const source = await strategy.createSource();
    const layers = strategy.createLayers();

    const newStyle = {
      ...style,
      sources: { ...style.sources, [sourceId]: source },
      layers: [...style.layers, ...layers],
    };

    this.activeOverlays.push(overlayName);
    return newStyle;
  }

  removeOverlay(map: MapInstance, overlayName: string) {
    const strategy = this.overlays.get(overlayName);
    if (!strategy) return;

    strategy.cleanup(map);
    this.activeOverlays = this.activeOverlays.filter(name => name !== overlayName);
  }

  getActiveMapInteractions(): readonly InteractionLayer[] {
    const interactions: InteractionLayer[] = [];

    this.activeOverlays.forEach(overlayName => {
      const strategy = this.overlays.get(overlayName);
      if (strategy) {
        const overlayInteractions = strategy.getInteractions();
        if (overlayInteractions) {
          interactions.push(...overlayInteractions);
        }
      }
    });

    return interactions;
  }

  getActiveSourceIds(): string[] {
    const sourceIds: string[] = [];
    this.activeOverlays.forEach(overlayName => {
      const strategy = this.overlays.get(overlayName);
      if (strategy) {
        const sourceId = strategy.getSourceId();
        if (!sourceIds.includes(sourceId)) {
          sourceIds.push(sourceId);
        }
      }
    });

    return sourceIds;
  }
}
