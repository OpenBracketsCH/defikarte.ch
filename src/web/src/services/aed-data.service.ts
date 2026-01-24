import type { Feature, FeatureCollection, Geometry } from 'geojson';
import { isOpenNow } from './opening-hours.service';
import backend from '../api/backend';
import type { RequestOptions } from '@defikarte/shared';

export const requestAedDataByCurrentAvailability = async (
  options?: RequestOptions
): Promise<FeatureCollection> => {
  const response = await backend.requestAedData(options);

  const features = response.features?.reduce<Feature<Geometry>[]>((acc, feature) => {
    if (feature.properties && isOpenNow(feature.properties.opening_hours as string)) {
      acc.push(feature);
    }

    return acc;
  }, []);

  return {
    type: 'FeatureCollection',
    features: features,
  };
};
