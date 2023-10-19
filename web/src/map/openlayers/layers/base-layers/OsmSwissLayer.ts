import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

export class OsmSwissLayer extends TileLayer<OSM> {
  constructor() {
    const swissOsm = new OSM();
    swissOsm.setUrl("https://tile.osm.ch/osm-swiss-style/{z}/{x}/{y}.png");
    super({
      source: swissOsm,
    });
  }
}
