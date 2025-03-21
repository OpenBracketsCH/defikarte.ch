import { LayerSpecification, Map, SourceSpecification } from 'maplibre-gl';

export type ActiveOverlayType = ('247' | 'restricted')[] | 'availability';

export interface InteractionLayer {
  on(layerIds: string[]): void;
  off(): void;
}

export interface OverlayStrategy {
  getSourceId(): string;
  createSource(): SourceSpecification | Promise<SourceSpecification>;
  createLayers(): LayerSpecification[];
  registerInteractions(map: Map): void;
  cleanup(map: Map): void;
}
