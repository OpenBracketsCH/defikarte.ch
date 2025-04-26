import { useTranslation } from 'react-i18next';
import { FilterType } from '../../../../../model/map';
import iconDefiGreen from './../../../../../assets/icons/icon-defi-circle-green.svg';
import iconDefiOrange from './../../../../../assets/icons/icon-defi-circle-orange.svg';
import iconOpeningHours from './../../../../../assets/icons/icon-opening-times-circle-green.svg';
import { FilterItem } from './filter-item/FilterItem';

type Props = {
  activeOverlays: FilterType[];
  setActiveOverlays: React.Dispatch<React.SetStateAction<FilterType[]>>;
};

export const FilterControl = ({ activeOverlays, setActiveOverlays }: Props) => {
  const { t } = useTranslation();

  const onFilterChange = (e: React.ChangeEvent<HTMLInputElement>, value: FilterType) => {
    setActiveOverlays(a => {
      if (a.includes(FilterType.availability) || value === FilterType.availability) {
        return e.target.checked ? [value] : [];
      }

      return e.target.checked ? [...a, value] : [...a.filter(x => !value.includes(x))];
    });
  };

  return (
    <div className="mx-4 md:mx-0">
      <FilterItem
        label={t('247Available')}
        checked={activeOverlays?.includes(FilterType.alwaysAvailable)}
        onChange={e => onFilterChange(e, FilterType.alwaysAvailable)}
        icon={iconDefiGreen}
      />
      <FilterItem
        label={t('withOpeningHours')}
        checked={activeOverlays?.includes(FilterType.restricted)}
        onChange={e => onFilterChange(e, FilterType.restricted)}
        icon={iconDefiOrange}
      />
      <FilterItem
        label={t('availableNow')}
        checked={activeOverlays.includes(FilterType.availability)}
        onChange={e => onFilterChange(e, FilterType.availability)}
        icon={iconOpeningHours}
      />
    </div>
  );
};
