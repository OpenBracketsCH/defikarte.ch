import { LayerType } from "../constants/layers";
import { AedClusterLayer } from "../layers/aed-layers/AedClusterLayer";
import { OsmCommonLayer } from "../layers/base-layers/OsmCommonLayer";
import { OsmSwissLayer } from "../layers/base-layers/OsmSwissLayer";
import { SwisstopoLayer } from "../layers/base-layers/SwisstopoLayer";

export const availableLayers = [
  { type: LayerType.OsmSwiss, layer: new OsmSwissLayer() },
  { type: LayerType.OsmCommon, layer: new OsmCommonLayer() },
  { type: LayerType.Swisstopo, layer: new SwisstopoLayer() },
  { type: LayerType.Satellite },
  {
    type: LayerType.Aed247,
    layer: new AedClusterLayer({ minZoom: 0, maxZoom: 20 }),
  },
  {
    type: LayerType.AedDay,
    layer: new AedClusterLayer({ minZoom: 0, maxZoom: 20 }),
  },
  {
    type: LayerType.AedByOpeningHours,
    layer: new AedClusterLayer({ minZoom: 0, maxZoom: 20 }),
  },
];
