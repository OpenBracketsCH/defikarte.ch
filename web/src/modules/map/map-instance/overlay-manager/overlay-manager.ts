import { Map as MapInstance, StyleSpecification } from 'maplibre-gl';
import {
  InteractionLayer,
  MapEventCallback,
  OverlayStrategy,
  OverlayType,
} from '../../../../model/map';

export class OverlayManager {
  private overlays: Map<OverlayType, OverlayStrategy> = new Map();
  private activeOverlays: OverlayType[] = [];
  private onEvent: MapEventCallback | undefined;

  constructor(onEvent?: MapEventCallback) {
    this.onEvent = onEvent;
  }

  public registerOverlay(overlay: OverlayType, strategy: OverlayStrategy) {
    this.overlays.set(overlay, strategy);
  }

  public async applyOverlay(map: MapInstance, overlay: OverlayType): Promise<void> {
    if (this.activeOverlays.includes(overlay)) return;
    const strategy = this.overlays.get(overlay);
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
    this.activeOverlays.push(overlay);
  }

  public async applyOverlayOnStyle(
    overlay: OverlayType,
    style: StyleSpecification
  ): Promise<StyleSpecification> {
    if (this.activeOverlays.includes(overlay)) return style;
    const strategy = this.overlays.get(overlay);
    if (!strategy) return style;

    const sourceId = strategy.getSourceId();
    const source = await strategy.createSource();
    const layers = strategy.createLayers();

    const newStyle = {
      ...style,
      sources: { ...style.sources, [sourceId]: source },
      layers: [...style.layers, ...layers],
    };

    this.activeOverlays.push(overlay);
    return newStyle;
  }

  public removeOverlay(map: MapInstance, overlay: OverlayType) {
    if (!this.activeOverlays.includes(overlay)) return;
    const strategy = this.overlays.get(overlay);
    if (!strategy) return;

    strategy.cleanup(map);
    this.activeOverlays = this.activeOverlays.filter(name => name !== overlay);
  }

  public getActiveOverlays = () => this.activeOverlays as readonly OverlayType[];

  public getActiveMapInteractions(): readonly InteractionLayer[] {
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

  public getActiveSourceIds(): string[] {
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
