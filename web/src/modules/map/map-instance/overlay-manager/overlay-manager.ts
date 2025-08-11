import { Map as MapInstance, StyleSpecification } from 'maplibre-gl';
import {
  InteractionLayer,
  MapEventCallback,
  OverlayStrategy,
  OverlayType,
  RefreshableOverlayStrategy,
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

  public async applyActiveOverlaysOnStyle(style: StyleSpecification): Promise<StyleSpecification> {
    for (const overlay of this.activeOverlays) {
      const strategy = this.overlays.get(overlay);
      if (!strategy) return style;

      const sourceId = strategy.getSourceId();
      const source = await strategy.createSource();
      const layers = strategy.createLayers();

      style = {
        ...style,
        sources: { ...style.sources, [sourceId]: source },
        layers: [...style.layers, ...layers],
      };
    }

    return style;
  }

  public removeOverlay(map: MapInstance, overlay: OverlayType) {
    if (!this.activeOverlays.includes(overlay)) return;
    const strategy = this.overlays.get(overlay);
    if (!strategy) return;

    strategy.cleanup(map);
    this.activeOverlays = this.activeOverlays.filter(name => name !== overlay);
  }

  public async refreshActiveOverlays(map: MapInstance) {
    await Promise.all(
      this.activeOverlays.map(async overlayName => {
        const strategy = this.overlays.get(overlayName);
        if (strategy && this.isRefreshableOverlayStrategy(strategy)) {
          await strategy.refreshSourceData(map);
        }
      })
    );
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

  private isRefreshableOverlayStrategy(
    strategy: OverlayStrategy
  ): strategy is OverlayStrategy & RefreshableOverlayStrategy {
    return 'refreshSourceData' in strategy;
  }
}
