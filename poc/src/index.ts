import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import "ol/ol.css";
import OSM from "ol/source/OSM.js";
import { AedClusterLayer } from "./layers/aed-cluster-layer/AedClusterLayer";
import { getAedData } from "./services/aed-data.service";

const map = new Map({
  target: "map",
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [900000, 5950000],
    zoom: 6,
  }),
});

//var aedLayer = new AedLayer({ minZoom: 14, maxZoom: 20 });
var aedClusterLayer = new AedClusterLayer({ minZoom: 0 });
//map.addLayer(aedLayer);
map.addLayer(aedClusterLayer);
getAedData().then((data) => {
  //aedLayer.setData(data);
  aedClusterLayer.setData(data);
});

aedClusterLayer.addClusterZoom(map);
aedClusterLayer.addSelectFeatureInteraction(map);
