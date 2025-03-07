import { GeoJSON, GeoJsonProperties, Geometry } from 'geojson';
import { GeoJSONSourceSpecification } from 'maplibre-gl';

export const createAedSource = (
  data: string | GeoJSON<Geometry, GeoJsonProperties>
): GeoJSONSourceSpecification => {
  return {
    type: 'geojson',
    data: data,
    cluster: true,
    clusterRadius: 75,
    clusterMaxZoom: 14,
    attribution: '© OpenStreetMap contributors',
  } as GeoJSONSourceSpecification;
};
