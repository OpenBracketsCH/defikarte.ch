import className from 'classnames';
import { FeatureCollection, Point } from 'geojson';
import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapIconButton } from '../../../components/ui/map-icon-button/MapIconButton';
import { filterLabelContent, searchAddress } from '../../../services/address-search.service';
import { MapInstance } from '../map-instance/map-instance';
import iconClose from './../../../assets/icons/icon-close-dark-green.svg';
import iconFilter from './../../../assets/icons/icon-filter-dark-green.svg';
import iconGpsOff from './../../../assets/icons/icon-gps-off-circle-green.svg';
import iconGpsOn from './../../../assets/icons/icon-gps-on-circle-green.svg';
import iconSearch from './../../../assets/icons/icon-search-dark-green.svg';
import { FilterControl } from './filter-control/FilterControl';

type Props = {
  map: MapInstance | null;
};

export const SearchBar = (props: Props) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FeatureCollection | null>(null);
  const [isGpsActive, setIsGpsActive] = useState(false);
  const [showFilter, setShowFilter] = useState(false);

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

  const mainClasses = className(
    'flex',
    'items-center',
    'bg-primary-100-white',
    'mx-4',
    'md:mx-0',
    'p-3',
    'md:p-4',
    'gap-2',
    'md:gap-4',
    'h-5',
    'md:h-7',
    'shadow-green-shadow',
    'box-content',
    {
      'rounded-[22px]': !showFilter,
      'md:rounded-[30px]': !showFilter,
      'rounded-t-[22px]': showFilter,
      'md:rounded-t-[30px]': showFilter,
      'border-b': showFilter,
      'border-b-primary-10-green-05': showFilter,
    }
  );

  return (
    <div
      style={{ zIndex: 100000 }}
      className="relative w-full flex flex-col items-center h-0 mt-4 md:mt-6"
    >
      <div className="w-full md:w-[550px] lg:w-[650px]">
        <div className={mainClasses}>
          <img src={iconSearch} alt="search-icon" />
          <input
            onChange={onSearchChange}
            className="grow border-none outline-hidden text-base font-normal text-primary-100-green-04 leading-6"
            type="search"
            id="search"
            placeholder={t('enterLocationOrAddress')}
            list="search-results"
            value={searchText}
          />
          <div className="flex justify-end gap-2 ml-0">
            {searchText && (
              <MapIconButton active={false} icon={iconClose} onClick={() => setSearchText('')} />
            )}
            <MapIconButton
              active={false}
              icon={iconFilter}
              onClick={() => setShowFilter(s => !s)}
            />
            <MapIconButton
              active={false}
              icon={isGpsActive ? iconGpsOn : iconGpsOff}
              variant={isGpsActive ? 'gps-on' : 'gps-off'}
              onClick={() => setIsGpsActive(s => !s)}
            />
          </div>
        </div>
        {showFilter && <FilterControl map={props.map} />}
        <datalist id="search-results">
          {searchResults?.features.map(f => (
            <option key={f.id} value={f.id}>
              {filterLabelContent(f.properties?.label).join(' ')}
            </option>
          ))}
        </datalist>
      </div>
    </div>
  );
};
