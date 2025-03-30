import className from 'classnames';
import { Feature, FeatureCollection, GeoJsonProperties, Geometry, Point } from 'geojson';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { MapIconButton } from '../../../../components/ui/map-icon-button/MapIconButton';
import { ActiveOverlayType } from '../../../../model/map';
import { filterLabelContent, searchAddress } from '../../../../services/address-search.service';
import { useUserLocation } from '../../hooks/useUserLocation';
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
};

export const SearchControl = (props: Props) => {
  const { t } = useTranslation();
  const [searchText, setSearchText] = useState<string>('');
  const [searchResults, setSearchResults] = useState<FeatureCollection | null>(null);
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlayType>(['247', 'restricted']);
  const {
    isActive: isGpsActive,
    setIsActive: setIsGpsActive,
    error: locationError,
  } = useUserLocation({
    map: props.map,
  });
  const [showFilter, setShowFilter] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (locationError) {
      toast.error(t(locationError));
    }
  }, [locationError, setIsGpsActive, t]);

  useEffect(() => {
    const search = async () => {
      if (searchText.length > 2) {
        const results = await searchAddress(searchText);
        setSearchResults(results);

        if (results.features.length >= 0) {
          setShowFilter(false);
        }
      }
    };

    const timer = setTimeout(() => {
      search();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

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
      props.map?.fitBounds([
        [bbox[0], bbox[1]],
        [bbox[2], bbox[3]],
      ]);
    } else {
      props.map?.easyTo((feature.geometry as Point).coordinates as [number, number], 18);
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
            ref={searchInputRef}
          />
          <div className="flex justify-end gap-2 ml-0">
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
            map={props.map}
            activeOverlay={activeOverlay}
            setActiveOverlay={setActiveOverlay}
          />
        )}
        {!showFilter && searchResults && (
          <SearchResults searchResults={searchResults} onItemSelect={onItemSelect} />
        )}
      </div>
    </div>
  );
};
