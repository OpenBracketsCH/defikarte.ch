import { AedClusterLayer } from "../layers/aed-layers/AedClusterLayer";
import { OsmCommonLayer } from "../layers/base-layers/OsmCommonLayer";
import { OsmSwissLayer } from "../layers/base-layers/OsmSwissLayer";
import { SwisstopoLayer } from "../layers/base-layers/SwisstopoLayer";

export enum LayerType {
  UNKNOWN,
  OSM_SWISS,
  OSM_COMMON,
  SWISSTOPO,
  SATELLITE,
  AED247,
  AED_DAY,
  AED_BY_OPENING_HOURS,
}

export type LayerConfiguration = {
  type: LayerType;
  layer: any;
  priority: number;
};

export const layerGroups = [
  [
    LayerType.OSM_SWISS,
    LayerType.OSM_COMMON,
    LayerType.SWISSTOPO,
    LayerType.SATELLITE,
  ],
  [LayerType.AED247, LayerType.AED_BY_OPENING_HOURS],
  [LayerType.AED_DAY, LayerType.AED_BY_OPENING_HOURS],
];

export const availableLayers: LayerConfiguration[] = [
  {
    type: LayerType.SATELLITE,
    layer: new SwisstopoLayer("ch.swisstopo.swissimage"),
    priority: 5,
  },
  { type: LayerType.OSM_COMMON, layer: new OsmCommonLayer(), priority: 6 },
  { type: LayerType.OSM_SWISS, layer: new OsmSwissLayer(), priority: 6 },
  {
    type: LayerType.SWISSTOPO,
    layer: new SwisstopoLayer("ch.swisstopo.pixelkarte-farbe"),
    priority: 7,
  },
  {
    type: LayerType.AED247,
    layer: new AedClusterLayer({ minZoom: 0, maxZoom: 20 }),
    priority: 20,
  },
  {
    type: LayerType.AED_DAY,
    layer: new AedClusterLayer({ minZoom: 0, maxZoom: 20 }),
    priority: 20,
  },
  {
    type: LayerType.AED_BY_OPENING_HOURS,
    layer: new AedClusterLayer({ minZoom: 0, maxZoom: 20 }),
    priority: 20,
  },
];

export const defaultLayers = [
  LayerType.OSM_SWISS,
  LayerType.AED247,
  LayerType.AED_DAY,
];
