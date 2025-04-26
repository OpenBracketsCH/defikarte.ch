import { GeoJSON, GeoJsonProperties, Geometry } from 'geojson';
import { GeoJSONSourceSpecification } from 'maplibre-gl';

export const createGeoJSONSource = (
  data: string | GeoJSON<Geometry, GeoJsonProperties>
): GeoJSONSourceSpecification => {
  return {
    type: 'geojson',
    data: data,
  } as GeoJSONSourceSpecification;
};
