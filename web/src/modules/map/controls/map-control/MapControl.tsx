import className from 'classnames';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import layerIconGreen from '../../../../assets/icons/icon-layers-dark-green.svg';
import layerIconWhite from '../../../../assets/icons/icon-layers-white.svg';
import iconMinus from '../../../../assets/icons/icon-minus-dark-green.svg';
import iconPlus from '../../../../assets/icons/icon-plus-dark-green.svg';
import { MapIconButton } from '../../../../components/ui/map-icon-button/MapIconButton';
import { MapConfiguration } from '../../map-instance/configuration/map.configuration';
import { MapInstance } from '../../map-instance/map-instance';
import swisstopoImageryImage from './../../../../assets/images/map-preview-aerial-view.png';
import swisstopoBaseMapImage from './../../../../assets/images/map-preview-base-map.png';
import osmImage from './../../../../assets/images/map-preview-open-street.png';
import { LayerSymbol } from './layer-symbol/LayerSymbol';

type Props = {
  map: MapInstance | null;
  setActiveBaseLayer: (id: string) => void;
  activeBaseLayer: string;
};

export const MapControl = (props: Props) => {
  const { t } = useTranslation();
  const [isActive, setIsActive] = useState(false);

  const setActiveBaseLayer = (id: string) => {
    props.map?.setActiveBaseLayer(id);
    props.setActiveBaseLayer(id);
  };

  const mainClasses = className(
    'absolute',
    'flex',
    'flex-col',
    'md:flex-row',
    'items-end',
    'md:items-start',
    'justify-end',
    'h-0',
    'mb-5',
    'mr-4',
    'md:mr-6',
    'mt-6',
    'bottom-0',
    'md:bottom-auto',
    'top-auto',
    'md:top-0',
    'right-0'
  );

  const { map, activeBaseLayer } = props;
  return (
    <div className={mainClasses} style={{ zIndex: 100000 }}>
      {isActive && (
        <div className="md:mr-3 flex flex-col md:flex-row gap-2">
          <LayerSymbol
            active={activeBaseLayer === MapConfiguration.osmVectorBasemapId}
            img={swisstopoBaseMapImage}
            label={t('basemap')}
            onClick={() => setActiveBaseLayer(MapConfiguration.osmVectorBasemapId)}
          />
          <LayerSymbol
            active={activeBaseLayer === MapConfiguration.osmBaseMapId}
            img={osmImage}
            label={t('osm')}
            onClick={() => setActiveBaseLayer(MapConfiguration.osmBaseMapId)}
          />
          <LayerSymbol
            active={activeBaseLayer === MapConfiguration.swisstopoImageryBaseMapId}
            img={swisstopoImageryImage}
            label={t('satellite')}
            onClick={() => setActiveBaseLayer(MapConfiguration.swisstopoImageryBaseMapId)}
          />
        </div>
      )}
      <div className="flex flex-col gap-1 mt-2 md:mt-0">
        <MapIconButton
          active={isActive}
          icon={isActive ? layerIconWhite : layerIconGreen}
          onClick={() => setIsActive(s => !s)}
        />
        <MapIconButton
          active={false}
          icon={iconPlus}
          onClick={() => map?.zoomIn()}
          className="hidden md:flex"
        />
        <MapIconButton
          active={false}
          icon={iconMinus}
          onClick={() => map?.zoomOut()}
          className="hidden md:flex"
        />
      </div>
    </div>
  );
};
