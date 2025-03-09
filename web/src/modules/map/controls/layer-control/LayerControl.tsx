import { useTranslation } from 'react-i18next';
import { MapConfiguration } from '../../map-instance/configuration/map.configuration';
import { MapInstance } from '../../map-instance/map-instance';

type Props = {
  map: MapInstance | null;
};

export const LayerControl = (props: Props) => {
  const { t } = useTranslation();
  const map = props.map;

  return (
    <div style={{ zIndex: 10000, position: 'absolute', top: 0, left: 0 }}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => map?.setActiveBaseLayer(MapConfiguration.swisstopoBaseMapId)}
      >
        {t('basemap')}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => map?.setActiveBaseLayer(MapConfiguration.swisstopoImageryBaseMapId)}
      >
        {t('satellite')}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => map?.setActiveBaseLayer(MapConfiguration.osmBaseMapId)}
      >
        {t('osm')}
      </button>
    </div>
  );
};
