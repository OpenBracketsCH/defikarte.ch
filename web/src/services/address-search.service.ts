import { FeatureCollection } from 'geojson';
import backend from '../api/backend';

export const searchAddress = async (searchText: string) => {
  try {
    const response = await backend.get<FeatureCollection>(`/v2/search/${searchText}`, {
      method: 'GET',
      headers: {
        'ACCESS-Control-Allow-Origin': '*',
      },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }

  return { type: 'FeatureCollection', features: [] } as FeatureCollection;
};
