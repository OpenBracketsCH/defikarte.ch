import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

export class OsmCommonLayer extends TileLayer<OSM> {
  constructor() {
    super({
      source: new OSM(),
    });
  }
}
