import { Feature, FeatureCollection, Geometry } from 'geojson';
import backend from '../api/backend';
import { AedData } from '../model/app';
import { isOpenNow } from './opening-hours.service';

export const requestAedData = async (): Promise<FeatureCollection> => {
  try {
    const response = await backend.get<FeatureCollection>('/v2/defibrillator', {
      method: 'GET',
    });
    if (response.status === 200) {
      const data = await response.data;
      return data;
    }
  } catch (error) {
    console.error(error);
  }

  return {} as FeatureCollection;
};

export const requestAedDataByCurrentAvailability = async (): Promise<FeatureCollection> => {
  const response = await requestAedData();

  const features = response.features.reduce<Feature<Geometry>[]>((acc, feature) => {
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

export const postAedData = async (data: AedData) => {
  return await backend.post<FeatureCollection>('v2/defibrillator', {
    ...data,
    source: 'local_knowledge, defikarte.ch',
  });
};

export const putAedData = async (data: AedData) => {
  if (!data.id) {
    throw new Error('AED data must have an id to be updated');
  }

  return await backend.put<FeatureCollection>(`v2/defibrillator/${data.id}`, {
    ...data,
    source: 'local_knowledge, defikarte.ch',
  });
};
