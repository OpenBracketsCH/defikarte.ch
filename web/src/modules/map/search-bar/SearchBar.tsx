import { FeatureCollection, Point } from 'geojson';
import { useCallback, useEffect, useState } from 'react';
import { MapIconButton } from '../../../components/ui/map-icon-button/MapIconButton';
import { filterLabelContent, searchAddress } from '../../../services/address-search.service';
import { MapInstance } from '../map-instance/map-instance';
import iconFilter from './../../../assets/icons/icon-filter-dark-green.svg';
import iconGpsOff from './../../../assets/icons/icon-gps-off-circle-green.svg';
import iconGpsOn from './../../../assets/icons/icon-gps-on-circle-green.svg';
import iconSearch from './../../../assets/icons/icon-search-dark-green.svg';

type Props = {
  map: MapInstance | null;
};

export const SearchBar = (props: Props) => {
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FeatureCollection | null>(null);
  const [isGpsActive, setIsGpsActive] = useState(false);

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
      style={{ zIndex: 100000, position: 'absolute' }}
      className="w-full flex justify-center h-0 mt-6"
    >
      <div className="flex items-center rounded-full bg-white p-4 gap-4 w-[30%] h-[60px] shadow-green-shadow">
        <img src={iconSearch} alt="search-icon" />
        <input
          onChange={onSearchChange}
          className="flex-grow border-none outline-none text-base"
          type="search"
          id="search"
          placeholder="Search for places"
          list="search-results"
          value={searchText}
        />
        <div className="flex justify-end gap-3">
          <MapIconButton
            active={false}
            icon={iconFilter}
            onClick={() => console.log('show filter')}
          />
          <MapIconButton
            active={false}
            icon={isGpsActive ? iconGpsOn : iconGpsOff}
            onClick={() => setIsGpsActive(s => !s)}
          />
        </div>
      </div>
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
