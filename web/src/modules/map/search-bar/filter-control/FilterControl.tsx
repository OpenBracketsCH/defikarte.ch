import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ActiveOverlayType } from '../../../../model/map';
import { MapInstance } from '../../map-instance/map-instance';

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
    <div style={{ zIndex: 10000, position: 'absolute', top: 0, left: 0 }}>
      <input
        id="247"
        type="checkbox"
        className="m-1"
        checked={activeOverlay?.includes('247')}
        onChange={e => onFilterChange(e, ['247'])}
      />
      <label htmlFor="247">{t('247')}</label>
      <input
        id="restricted"
        type="checkbox"
        className="m-1"
        checked={activeOverlay?.includes('restricted')}
        onChange={e => onFilterChange(e, ['restricted'])}
      />
      <label htmlFor="247">{t('restricted')}</label>
      <input
        id="available-now"
        type="checkbox"
        className="m-1"
        checked={activeOverlay === 'availability'}
        onChange={e => onFilterChange(e, 'availability')}
      />
      <label htmlFor="available-now">{t('available-now')}</label>
    </div>
  );
};
