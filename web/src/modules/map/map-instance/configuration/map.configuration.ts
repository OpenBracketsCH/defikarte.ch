import {
  GeoJSONSourceSpecification,
  RasterSourceSpecification,
  StyleSpecification,
} from "maplibre-gl";
import { createOsmLayerSpec } from "../layers/osm.layers";
import { LayerConfiguration } from "./layer.configuration";

export class MapConfiguration {
  public static defaultCenter: [number, number] = [7.4, 46.95];
  public static defaultZoom: number = 10;

  public static osmSourceSpec: RasterSourceSpecification = {
    type: "raster",
    tiles: ["https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"],
    tileSize: 256,
    minzoom: 0,
    maxzoom: 19,
    attribution: "© OpenStreetMap contributors",
  };

  public static aedSourceSpec: GeoJSONSourceSpecification = {
    type: "geojson",
    data: "https://defikarte-backend-staging.azurewebsites.net/api/v2/defibrillator",
    cluster: true,
    clusterMaxZoom: 14,
    clusterRadius: 75,
  };

  public static baseLayers: { [key: string]: string | StyleSpecification } = {
    [LayerConfiguration.osmLayerId]: {
      version: 8,
      sources: {
        [LayerConfiguration.osmLayerSource]: this.osmSourceSpec,
      },
      glyphs: "https://vectortiles.geo.admin.ch/fonts/{fontstack}/{range}.pbf",
      layers: [createOsmLayerSpec()], // Todo: as long there is only one aed layer, this can stay. afterwards this has to be added depending on the user selection
    },
    [LayerConfiguration.swisstopoBaseMapLayerId]:
      "https://vectortiles.geo.admin.ch/styles/ch.swisstopo.lightbasemap.vt/style.json",
    [LayerConfiguration.swisstopoImageryBaseMapLayerId]:
      "https://vectortiles.geo.admin.ch/styles/ch.swisstopo.imagerybasemap.vt/style.json",
  };

  public static defaultStyle: string | StyleSpecification =
    this.baseLayers[LayerConfiguration.swisstopoBaseMapLayerId];
}
