import { FeatureCollection } from 'geojson';
import { MapInstance } from '../modules/map/map-instance/map-instance';

export const searchAed = async (searchText: string, sourceIds: string[], map: MapInstance) => {
  if (!searchText) {
    return [];
  }

  const data: FeatureCollection = { features: [], type: 'FeatureCollection' };
  for (const sourceId of sourceIds) {
    const sourceData = await map.getGeoJsonSourceData(sourceId);
    sourceData.features.forEach(feature => {
      if (feature.properties) {
        feature.properties.source = sourceId;
      }
    });
    data.features = [...data.features, ...sourceData.features];
  }

  const results = data.features.map(feature => {
    const properties = feature.properties || {};
    const name = properties.name || '';
    const defibrillatorLocation = properties['defibrillator:location'] || '';
    const description = properties.description || '';
    const operator = properties.operator || '';

    const countMatches =
      doesTextMatch(searchText, name) +
      doesTextMatch(searchText, defibrillatorLocation) +
      doesTextMatch(searchText, description) +
      doesTextMatch(searchText, operator);

    return { feature, countMatches };
  });

  return results
    .filter(result => result.countMatches > 2)
    .sort((a, b) => {
      return b.countMatches - a.countMatches;
    })
    .map(result => result.feature);
};

const doesTextMatch = (searchText: string, value: string) => {
  const searchTerms = searchText
    .toLowerCase()
    .split(' ')
    .map(term => term.trim())
    .filter(term => term != ' ' && term.length > 2);
  const searchRegex = new RegExp(searchTerms.join('|'), 'g');
  const matches = Array.from(value.toLowerCase().matchAll(searchRegex));

  return matches.reduce(
    (acc, match) => acc + (match[0].length > 3 ? match[0].length : match[0].length / 2),
    0
  );
};
