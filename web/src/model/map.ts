import { Feature, GeoJsonProperties, Point } from 'geojson';
import { LayerSpecification, Map, MapGeoJSONFeature, SourceSpecification } from 'maplibre-gl';

export enum FilterType {
  'alwaysAvailable',
  'restricted',
  'availability',
}

export enum OverlayType {
  'aed',
  'aed247',
  'aedRestricted',
  'aedAvailability',
  'userLocation',
  'aedCreate',
}

export enum CreateMode {
  'none',
  'position',
  'form',
}

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

export interface RefreshableOverlayStrategy {
  refreshSourceData(map: Map): Promise<void>;
}

export type MapEventCallback = (event: MapEvent) => void;

export type MapEvent = (ItemSelectEvent | ItemMoveEvent) & BaseEvent;

export interface BaseEvent {
  layerIds?: string[];
  source?: string;
}

export interface ItemSelectEvent {
  type: 'item-select';
  data: MapGeoJSONFeature | null;
}

export interface ItemMoveEvent {
  type: 'item-move';
  data: Feature<Point, GeoJsonProperties> | null;
}
