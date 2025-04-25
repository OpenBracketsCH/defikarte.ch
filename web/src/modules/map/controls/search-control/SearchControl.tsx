import className from 'classnames';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry, Point } from 'geojson';
import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapIconButton } from '../../../../components/ui/map-icon-button/MapIconButton';
import { ActiveOverlayType } from '../../../../model/map';
import { filterLabelContent, searchAddress } from '../../../../services/address-search.service';
import { searchAed } from '../../../../services/aed-search.service';
import { MapConfiguration } from '../../map-instance/configuration/map.configuration';
import { MapInstance } from '../../map-instance/map-instance';
import iconClose from './../../../../assets/icons/icon-close-dark-green.svg';
import iconFilter from './../../../../assets/icons/icon-filter-dark-green.svg';
import iconGpsOff from './../../../../assets/icons/icon-gps-off-circle-green.svg';
import iconGpsOn from './../../../../assets/icons/icon-gps-on-circle-green.svg';
import iconSearch from './../../../../assets/icons/icon-search-dark-green.svg';
import { FilterControl } from './filter-control/FilterControl';
import { SearchResults } from './search-results/SearchResults';

type Props = {
  map: MapInstance | null;
  isGpsActive: boolean;
  setIsGpsActive: Dispatch<SetStateAction<boolean>>;
};

export const SearchControl = ({ map, isGpsActive, setIsGpsActive }: Props) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FeatureCollection | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlayType>(['247', 'restricted']);
  const [showFilter, setShowFilter] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const search = async () => {
      if (searchText.length > 2) {
        const results = await searchAddress(searchText);
        const mapResults =
          (map &&
            (await searchAed(
              searchText,
              activeOverlay === 'availability'
                ? MapConfiguration.aedAvailabilitySourceId
                : MapConfiguration.aedSourceId,
              map
            ))) ||
          [];
        setSearchResults({
          type: 'FeatureCollection',
          features: [...results.features.slice(0, 10), ...mapResults.slice(0, 10)],
        });

        if (results.features.length >= 0) {
          setShowFilter(false);
        }
      }
    };

    const timer = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(timer);
  }, [activeOverlay, searchText, map]);

  const onSearchChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    if (!value) {
      setSearchText('');
      setSearchResults(null);
      return;
    }

    setSearchText(value);
  };

  const onItemSelect = (feature: Feature<Geometry, GeoJsonProperties>) => {
    const bbox = feature.bbox;
    if (bbox?.length === 4) {
      map?.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ]);
    } else {
      map?.easyTo((feature.geometry as Point).coordinates as [number, number], 18);
    }

    const value = filterLabelContent(feature.properties?.label).join(' ');
    setSearchText(value);
  };

  const onReset = () => {
    setSearchText('');
    setSearchResults(null);
    searchInputRef.current?.focus();
  };

  const dropdownOpen =
    showFilter || (searchResults?.features && searchResults.features.length > 0 === true);
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
      'rounded-[22px]': !dropdownOpen,
      'md:rounded-[30px]': !dropdownOpen,
      'rounded-t-[22px]': dropdownOpen,
      'md:rounded-t-[30px]': dropdownOpen,
      'border-b': dropdownOpen,
      'border-b-primary-10-green-05': dropdownOpen,
    }
  );

  return (
    <div
      style={{ zIndex: 100000 }}
      className="absolute top-4 md:top-6 m-auto w-full flex flex-col items-center h-0"
    >
      <div className="w-full md:w-[550px] lg:w-[650px]">
        <div className={mainClasses}>
          <img src={iconSearch} alt="search-icon" />
          <input
            onChange={onSearchChange}
            className="grow min-w-0 outline-hidden text-base font-normal text-primary-100-green-04 leading-6"
            type="search"
            id="search"
            placeholder={t('enterLocationOrAddress')}
            list="search-results"
            value={searchText}
            ref={searchInputRef}
            autoComplete="off"
          />
          <div className="flex justify-end items-center gap-2 ml-0">
            {searchText && (
              <MapIconButton active={false} icon={iconClose} onClick={() => onReset()} />
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
        {showFilter && (
          <FilterControl
            map={map}
            activeOverlay={activeOverlay}
            setActiveOverlay={setActiveOverlay}
          />
        )}
        {!showFilter && searchResults && searchResults?.features.length > 0 && (
          <SearchResults searchResults={searchResults} onItemSelect={onItemSelect} />
        )}
      </div>
    </div>
  );
};
