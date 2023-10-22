import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";

export class OsmLayer extends TileLayer<OSM> {
  constructor(osmUrl?: string) {
    const osmSource = new OSM();
    if (osmUrl) {
      osmSource.setUrl(osmUrl);
    }
    super({
      source: osmSource,
    });
  }
}
