import axios from 'axios';
import { FeatureCollection } from 'geojson';

const ICON_TAG = '<i>';
const ICON_TAG_END = '</i>';
const BOLD_TAG = '<b>';
const BOLD_TAG_END = '</b>';
const TAG_LIST = [ICON_TAG, ICON_TAG_END, BOLD_TAG, BOLD_TAG_END];

// ToDo: Do that on backend
export const filterLabelContent = (label: string | null): string[] | null => {
  if (label === null) {
    return label;
  }
  const parts: string[] = label
    .split(/(<\/?i>|<\/?b>)/)
    .map((part: string) => part.trim())
    .filter((part: string) => part !== '');

  return parts
    .slice(parts.lastIndexOf(ICON_TAG_END) + 1)
    .filter((part: string) => !TAG_LIST.includes(part));
};

export const searchAddress = async (searchText: string) => {
  const params = new URLSearchParams();
  params.append('searchText', searchText);
  params.append('type', 'locations');
  params.append('returnGeometry', 'true');
  params.append('limit', '15');
  params.append('sr', '4326');
  params.append('geometryFormat', 'geojson');

  const url = new URL('https://api3.geo.admin.ch/rest/services/api/SearchServer');
  url.search = params.toString();

  try {
    const response = await axios.get<FeatureCollection>(url.toString(), {
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
