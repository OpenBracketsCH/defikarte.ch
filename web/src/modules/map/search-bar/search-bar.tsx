import { FeatureCollection, Point } from 'geojson';
import { useCallback, useEffect, useState } from 'react';
import { filterLabelContent, searchAddress } from '../../../services/address-search.service';
import { MapInstance } from '../map-instance/map-instance';

type Props = {
  map: MapInstance | null;
};

export const SearchBar = (props: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FeatureCollection | null>(null);

  const onSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value;
    if (!value) {
      setSearchText('');
      setSearchResults(null);
      return;
    }

    if (!searchResults) {
      setSearchText(value);
      return;
    }

    const feature = searchResults.features.find(f => f.id?.toString() === value);
    if (feature) {
      value = filterLabelContent(feature.properties?.label).join(' ');
      const bbox = feature.bbox;
      if (bbox?.length === 4) {
        props.map?.fitBounds([
          [bbox[0], bbox[1]],
          [bbox[2], bbox[3]],
        ]);
      } else {
        props.map?.easyTo((feature.geometry as Point).coordinates as [number, number], 18);
      }
    }

    setSearchText(value);
  };

  const onSearch = useCallback(async () => {
    const results = await searchAddress(searchText);
    setSearchResults(results);
  }, [searchText]);

  useEffect(() => {
    if (searchText.length > 2) {
      onSearch();
    }
  }, [searchText, onSearch]);

  return (
    <div
      style={{
        zIndex: 10000,
        margin: 'auto',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: '100%',
      }}
    >
      <input
        onChange={onSearchChange}
        className="p-2 rounded w-96"
        type="text"
        id="search"
        placeholder="Search for places"
        list="search-results"
        value={searchText}
      />
      <datalist id="search-results">
        {searchResults?.features.map(f => (
          <option key={f.id} value={f.id}>
            {filterLabelContent(f.properties?.label).join(' ')}
          </option>
        ))}
      </datalist>
    </div>
  );
};
