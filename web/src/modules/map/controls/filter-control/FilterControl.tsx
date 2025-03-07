import { useTranslation } from 'react-i18next';
import { MapInstance } from '../../map-instance/map-instance';

type Props = {
  map: MapInstance;
};

export const FilterControl = (props: Props) => {
  const { t } = useTranslation();
  const map = props.map;

  return (
    <div style={{ zIndex: 10000, position: 'absolute', top: 0, right: 0 }}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => map.setActiveOverlayLayer('default')}
      >
        {t('default')}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => map.setActiveOverlayLayer('availability')}
      >
        {t('aviaibility')}
      </button>
    </div>
  );
};
