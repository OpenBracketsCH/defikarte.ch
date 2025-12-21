import { FeatureCollection } from 'geojson';
import backend from '../api/backend';

type RequestOptions = {
  signal?: AbortSignal;
};

export const searchAddress = async (searchText: string, options?: RequestOptions) => {
  try {
    const response = await backend.get<FeatureCollection>(`/v3/search/${searchText}`, {
      method: 'GET',
      headers: {
        'ACCESS-Control-Allow-Origin': '*',
      },
      signal: options?.signal,
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    // Don't log cancelled requests
    if (error instanceof Error && error.name === 'CanceledError') {
      return { type: 'FeatureCollection', features: [] } as FeatureCollection;
    }
    console.error(error);
  }

  return { type: 'FeatureCollection', features: [] } as FeatureCollection;
};
