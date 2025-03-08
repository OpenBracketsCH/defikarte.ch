import { GeoJSON, GeoJsonProperties, Geometry } from 'geojson';
import { FilterSpecification, GeoJSONSourceSpecification } from 'maplibre-gl';

export const createAedSource = (
  data: string | GeoJSON<Geometry, GeoJsonProperties>,
  filter: FilterSpecification | null = null
): GeoJSONSourceSpecification => {
  return {
    type: 'geojson',
    data: data,
    cluster: true,
    clusterRadius: 75,
    clusterMaxZoom: 14,
    attribution: '© OpenStreetMap contributors',
    filter: filter,
  } as GeoJSONSourceSpecification;
};
