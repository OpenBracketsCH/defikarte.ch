import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveOverlayType } from '../../../../../model/map';
import { MapInstance } from '../../../map-instance/map-instance';
import iconDefiGreen from './../../../../../assets/icons/icon-defi-circle-green.svg';
import iconDefiOrange from './../../../../../assets/icons/icon-defi-circle-orange.svg';
import iconOpeningHours from './../../../../../assets/icons/icon-opening-times-circle-green.svg';
import { FilterItem } from './filter-item/FilterItem';

type Props = {
  map: MapInstance | null;
};

export const FilterControl = (props: Props) => {
  const { t } = useTranslation();
  const [activeOverlay, setActiveOverlay] = useState<ActiveOverlayType>(['247', 'restricted']);

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>, value: ActiveOverlayType) => {
    setActiveOverlay(a => {
      if (a === value) {
        return a;
      }

      if (a === 'availability' || value === 'availability') {
        return e.target.checked ? value : [];
      }

      return e.target.checked ? [...a, ...value] : [...a.filter(x => !value.includes(x))];
    });
  };

  useEffect(() => {
    props.map?.setActiveOverlayLayer(activeOverlay);
  }, [activeOverlay, props.map]);

  return (
    <div className="mx-4 md:mx-0">
      <FilterItem
        label={t('247Available')}
        checked={activeOverlay?.includes('247')}
        onChange={e => onFilterChange(e, ['247'])}
        icon={iconDefiGreen}
      />
      <FilterItem
        label={t('withOpeningHours')}
        checked={activeOverlay?.includes('restricted')}
        onChange={e => onFilterChange(e, ['restricted'])}
        icon={iconDefiOrange}
      />
      <FilterItem
        label={t('availableNow')}
        checked={activeOverlay == 'availability'}
        onChange={e => onFilterChange(e, 'availability')}
        icon={iconOpeningHours}
      />
    </div>
  );
};
