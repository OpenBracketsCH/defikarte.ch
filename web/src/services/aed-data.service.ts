import backend from '../api/backend';
import { Feature, FeatureCollection, Geometry } from 'geojson';
import { isOpenNow } from './opening-hours.service';
import { AedData } from '../model/app';

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
  return await backend.post('v2/defibrillator', {
    ...data,
    source: 'local_knowledge, defikarte.ch',
  });
};
