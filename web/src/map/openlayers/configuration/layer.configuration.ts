import { AedClusterLayer } from "../layers/aed-layers/AedClusterLayer";
import { OsmLayer } from "../layers/base-layers/OsmLayer";
import { SwisstopoLayer } from "../layers/base-layers/SwisstopoLayer";
import { selectInteraction } from "../layers/aed-layers/aed-layer-interactions";
import { filterByOpeningHours } from "../layers/aed-layers/aed-filter";
import {
  clusterAvailabillityPointStyle,
  clusterDayPointStyle,
  clusterPointStyle,
} from "../styles/aed-point.style";
import { SelectPositionLayer } from "../layers/select-position-layer/SelectPositionLayer";

export enum LayerType {
  UNKNOWN,
  OSM_SWISS,
  OSM_COMMON,
  SWISSTOPO,
  SATELLITE,
  AED247,
  AED_DAY,
  AED_BY_OPENING_HOURS,
  SELECT,
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
  { type: LayerType.OSM_COMMON, layer: new OsmLayer(), priority: 6 },
  {
    type: LayerType.OSM_SWISS,
    layer: new OsmLayer("https://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png"),
    priority: 6,
  },
  {
    type: LayerType.SWISSTOPO,
    layer: new SwisstopoLayer("ch.swisstopo.pixelkarte-grau"),
    priority: 7,
  },
  {
    type: LayerType.AED247,
    layer: new AedClusterLayer({
      minZoom: 0,
      maxZoom: 20,
      dataFilter: filterByOpeningHours("247"),
      style: clusterPointStyle,
    }),
    priority: 21,
  },
  {
    type: LayerType.AED_DAY,
    layer: new AedClusterLayer({
      minZoom: 0,
      maxZoom: 20,
      dataFilter: filterByOpeningHours("day"),
      style: clusterDayPointStyle,
    }),
    priority: 20,
  },
  {
    type: LayerType.AED_BY_OPENING_HOURS,
    layer: new AedClusterLayer({
      minZoom: 0,
      maxZoom: 20,
      style: clusterAvailabillityPointStyle,
    }),
    priority: 20,
  },
  {
    type: LayerType.SELECT,
    layer: new SelectPositionLayer(),
    priority: 100,
  },
];

export const defaultLayers = [
  LayerType.OSM_SWISS,
  LayerType.AED247,
  LayerType.AED_DAY,
  LayerType.SELECT,
];

export const layerInteractions = [
  {
    layers: [
      LayerType.AED247,
      LayerType.AED_DAY,
      LayerType.AED_BY_OPENING_HOURS,
    ],
    interaction: selectInteraction,
  },
];
