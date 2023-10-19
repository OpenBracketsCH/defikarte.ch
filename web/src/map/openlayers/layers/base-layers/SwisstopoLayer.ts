import axios from "axios";
import WMTSCapabilities from "ol/format/WMTSCapabilities";
import TileLayer from "ol/layer/Tile";
import { WMTS } from "ol/source";
import { optionsFromCapabilities } from "ol/source/WMTS";

const url = "https://wmts.geo.admin.ch/EPSG/3857/1.0.0/WMTSCapabilities.xml";

export class SwisstopoLayer extends TileLayer<WMTS> {
  constructor() {
    super({});
    this.loadLayer();
  }

  loadLayer() {
    const parser = new WMTSCapabilities();
    axios.get(url).then((response) => {
      const result = parser.read(response.data);
      const options = optionsFromCapabilities(result, {
        layer: "ch.swisstopo.pixelkarte-farbe",
        matrixSet: "EPSG:3857",
      });
      if (!options) {
        return;
      }
      this.setSource(new WMTS(options));
    });
  }
}
