export type ActiveOverlayType = ('247' | 'restricted')[] | 'availability';

export interface InteractionLayer {
  set(layerIds: string[]): void;
}
