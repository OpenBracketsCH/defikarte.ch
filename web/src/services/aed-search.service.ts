import { MapInstance } from '../modules/map/map-instance/map-instance';

export class AedSearchService {
  private map: MapInstance;

  constructor(map: MapInstance) {
    this.map = map;
  }

  public searchAed = async (searchText: string, sourceId: string) => {
    if (!searchText) {
      return [];
    }

    const data = await this.map.getGeoJsonSourceData(sourceId);
    const results = data.features.map(feature => {
      const properties = feature.properties || {};
      const name = properties.name || '';
      const defibrillatorLocation = properties['defibrillator:location'] || '';
      const description = properties.description || '';
      const operator = properties.operator || '';

      const countMatches =
        this.doesTextMatch(searchText, name) +
        this.doesTextMatch(searchText, defibrillatorLocation) +
        this.doesTextMatch(searchText, description) +
        this.doesTextMatch(searchText, operator);

      return { feature, countMatches };
    });

    return results
      .filter(result => result.countMatches > 0)
      .sort((a, b) => {
        return b.countMatches - a.countMatches;
      })
      .map(result => result.feature);
  };

  private doesTextMatch = (searchText: string, value: string) => {
    const searchTerms = searchText
      .toLowerCase()
      .split(' ')
      .map(term => term.trim())
      .filter(term => term != ' ' && term.length > 0);
    const searchRegex = new RegExp(searchTerms.join('|'), 'g');
    const matches = Array.from(value.toLowerCase().matchAll(searchRegex));

    return matches.reduce(
      (acc, match) => acc + (match[0].length > 3 ? match[0].length : match[0].length / 2),
      0
    );
  };
}
