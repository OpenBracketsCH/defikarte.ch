import { StyleSpecification } from 'maplibre-gl';
import AppConfiguration from '../../../../configuration/app.configuration';
import { createOsmLayer } from '../layers/osm.layer';
import { createOsmSource } from '../sources/osm.source';

export class MapConfiguration {
  public static defaultCenter: [number, number] = [7.4, 46.95];
  public static defaultZoom: number = 10;

  public static osmBaseMapId = 'osm-common';
  public static swisstopoBaseMapId = 'swisstopo-basemap';
  public static swisstopoImageryBaseMapId = 'swisstopo-imagery-basemap';

  public static osmBaseMapLayerId = 'osm-common-layer';
  public static osmLayerSourceId = 'osm-common-source';

  public static swisstopoBaseMapLayerId = 'siwsstopo-basemap-layer';
  public static swisstopoBaseMapLayerSourceId = 'siwsstopo-basemap-source';

  public static swisstopoImageryBaseMapLayerId = 'swisstopo-imagery-basemap-layer';
  public static swisstopoImageryBaseMapLayerSourceId = 'swisstopo-imagery-basemap-source';

  public static aedPointLayerId = 'aed-layer';
  public static aedSourceId = 'aed-source';

  public static aedAvailabilityPointLayerId = 'aed-availability-layer';
  public static aedAvailabilitySourceId = 'aed-availability-source';

  public static userLocationLayerId = 'user-location-layer';
  public static userLocationSourceId = 'user-location-source';

  public static aedGeoJsonUrl = `${AppConfiguration.baseUrl}v2/defibrillator`;

  public static baseLayers: { [key: string]: string | StyleSpecification } = {
    [this.osmBaseMapId]: {
      version: 8,
      sources: {
        [this.osmLayerSourceId]: createOsmSource(),
      },
      glyphs: 'https://vectortiles.geo.admin.ch/fonts/{fontstack}/{range}.pbf',
      layers: [createOsmLayer(this.osmBaseMapLayerId, this.osmLayerSourceId)],
    },
    [this.swisstopoBaseMapId]:
      'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.lightbasemap.vt/style.json',
    [this.swisstopoImageryBaseMapId]:
      'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.imagerybasemap.vt/style.json',
  };
}
