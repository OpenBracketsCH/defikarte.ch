import { LayerSpecification, Map, MapGeoJSONFeature, SourceSpecification } from 'maplibre-gl';

export type ActiveOverlayType = ('247' | 'restricted')[] | 'availability';

export interface InteractionLayer {
  on(layerIds: string[]): void;
  off(): void;
}

export interface OverlayStrategy {
  getSourceId(): string;
  createSource(): SourceSpecification | Promise<SourceSpecification>;
  createLayers(): LayerSpecification[];
  registerInteractions(map: Map, onEvent?: MapEventCallback): void;
  getInteractions(): readonly InteractionLayer[] | null;
  cleanup(map: Map): void;
}
export type MapEventCallback = (event: MapEvent) => void;

export type MapEvent = ItemSelectEvent & BaseEvent;

export interface BaseEvent {
  layerIds?: string[];
  source?: string;
}

export interface ItemSelectEvent {
  type: 'item-select';
  data: MapGeoJSONFeature | null;
}
