import { useTranslation } from 'react-i18next';
import { MapConfiguration } from '../../map-instance/configuration/map.configuration';
import { MapInstance } from '../../map-instance/map-instance';
import { useState } from 'react';
import { MapIconButton } from '../../../../components/ui/map-icon-button/map-icon-button';
import layerIconWhite from '../../../../assets/icons/icon-layers-white.svg';
import layerIconGreen from '../../../../assets/icons/icon-layers-dark-green.svg';
import iconMinus from '../../../../assets/icons/icon-minus-dark-green.svg';
import iconPlus from '../../../../assets/icons/icon-plus-dark-green.svg';

type Props = {
  map: MapInstance | null;
};

export const MapControl = (props: Props) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  const map = props.map;
  return (
    <div
      className="absolute top-0 right-0 mr-6 mt-6 flex justify-end flex-row-reverse"
      style={{ zIndex: 100000 }}
    >
      <div className="flex flex-col gap-1">
        <MapIconButton
          active={isActive}
          icon={isActive ? layerIconWhite : layerIconGreen}
          onClick={() => setIsActive(s => !s)}
        />
        <MapIconButton active={false} icon={iconPlus} onClick={() => map?.zoomIn()} />
        <MapIconButton active={false} icon={iconMinus} onClick={() => map?.zoomOut()} />
      </div>
      {isActive && (
        <div className="mr-3 flex flex-row">
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
      )}
    </div>
  );
};
