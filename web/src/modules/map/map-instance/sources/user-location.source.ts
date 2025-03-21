import { GeoJSON, GeoJsonProperties, Geometry } from 'geojson';
import { GeoJSONSourceSpecification } from 'maplibre-gl';

export const createUserLocationSource = (
  data: string | GeoJSON<Geometry, GeoJsonProperties>
): GeoJSONSourceSpecification => {
  return {
    type: 'geojson',
    data: data,
  } as GeoJSONSourceSpecification;
};
