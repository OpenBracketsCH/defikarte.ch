import axios from 'axios';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import backend from '../api/backend';
import { isOpenNow } from './opening-hours.service';

type RequestOptions = {
  signal?: AbortSignal;
};

export const requestAedData = async (options?: RequestOptions): Promise<FeatureCollection> => {
  try {
    const response = await backend.get<FeatureCollection>('/v3/aed', {
      method: 'GET',
      signal: options?.signal,
    });
    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (error) {
    if (axios.isCancel(error)) {
      console.warn('Request AED-data is canceled.');
    } else {
      console.error(error);
    }
  }

  return {} as FeatureCollection;
};

export const requestAedDataByCurrentAvailability = async (
  options?: RequestOptions
): Promise<FeatureCollection> => {
  const response = await requestAedData(options);

  const features = response.features?.reduce<Feature<Geometry>[]>((acc, feature) => {
    if (feature.properties && isOpenNow(feature.properties['opening_hours'])) {
      acc.push(feature);
    }

    return acc;
  }, []);

  return {
    type: 'FeatureCollection',
    features: features,
  };
};

export const postAedData = async (data: FeatureCollection) => {
  return await backend.post<FeatureCollection>('v3/aed', {
    ...data,
    source: 'local_knowledge, defikarte.ch',
  });
};

export const putAedData = async (data: FeatureCollection) => {
  if (!data.features[0].id) {
    throw new Error('AED data must have an id to be updated');
  }

  return await backend.put<FeatureCollection>(`v3/aed/${data.features[0].id}`, {
    ...data,
    source: 'local_knowledge, defikarte.ch',
  });
};
