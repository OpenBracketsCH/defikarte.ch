import { StyleSpecification } from 'maplibre-gl';
import AppConfiguration from '../../../../configuration/app.configuration';
import { createOsmLayer } from '../layers/osm.layer';
import { createOsmSource } from '../sources/osm.source';

export class MapConfiguration {
  public static defaultCenter: [number, number] = [8.12, 46.8];
  public static defaultZoom: number = 7;

  public static osmVectorBasemapId = 'osm-vector';
  public static osmBaseMapId = 'osm-common';
  public static swisstopoImageryBaseMapId = 'swisstopo-imagery-basemap';

  public static osmBaseMapLayerId = 'osm-common-layer';
  public static osmLayerSourceId = 'osm-common-source';

  public static aedPointLayerId = 'aed-layer';
  public static aedSourceId = 'aed-source';

  public static aedAvailabilityPointLayerId = 'aed-availability-layer';
  public static aedAvailabilitySourceId = 'aed-availability-source';

  public static userLocationLayerId = 'user-location-layer';
  public static userLocationSourceId = 'user-location-source';

  public static aedCreatePointLayerId = 'aed-create-layer';
  public static aedCreateSourceId = 'aed-create-source';

  public static aedGeoJsonUrl = `${AppConfiguration.baseUrl}v2/defibrillator`;

  public static baseLayers: { [key: string]: string | StyleSpecification } = {
    [this.osmVectorBasemapId]:
      'https://api.maptiler.com/maps/0195c3eb-ac1e-7b68-a394-3508e7d9f182/style.json?key=rkkVBvinLq3noddWXK67',
    [this.osmBaseMapId]: {
      version: 8,
      sources: {
        [this.osmLayerSourceId]: createOsmSource(),
      },
      glyphs: 'https://vectortiles.geo.admin.ch/fonts/{fontstack}/{range}.pbf',
      layers: [createOsmLayer(this.osmBaseMapLayerId, this.osmLayerSourceId)],
    },
    [this.swisstopoImageryBaseMapId]:
      'https://vectortiles.geo.admin.ch/styles/ch.swisstopo.imagerybasemap.vt/style.json',
  };
}
