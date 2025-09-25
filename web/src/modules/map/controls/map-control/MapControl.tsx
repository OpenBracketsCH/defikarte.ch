import className from 'classnames';
import { useEffect, useRef, useState } from 'react';
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

  const setActiveBaseLayer = async (id: string) => {
    props.setActiveBaseLayer(id);
    await props.map?.setActiveBaseLayer(id);
  };

  const mainClasses = className(
    'z-10',
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
  const layerContainerRef = useRef<HTMLDivElement | null>(null);
  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isActive) return;

    const onPointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (!target) return;

      // If click is inside the layer container or on the toggle button, ignore
      if (layerContainerRef.current && layerContainerRef.current.contains(target)) return;
      if (toggleButtonRef.current && toggleButtonRef.current.contains(target)) return;

      // Otherwise close the panel
      setIsActive(false);
    };

    document.addEventListener('pointerdown', onPointerDown);
    return () => document.removeEventListener('pointerdown', onPointerDown);
  }, [isActive]);

  return (
    <div className={mainClasses}>
      {isActive && (
        <div ref={layerContainerRef} className="md:mr-3 flex flex-col md:flex-row gap-2">
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
          ref={toggleButtonRef}
          title={t('layers')}
          active={isActive}
          icon={isActive ? layerIconWhite : layerIconGreen}
          onClick={() => setIsActive(s => !s)}
        />
        <MapIconButton
          title={t('zoomIn')}
          active={false}
          icon={iconPlus}
          onClick={() => map?.zoomIn()}
          className="hidden md:flex"
        />
        <MapIconButton
          title={t('zoomOut')}
          active={false}
          icon={iconMinus}
          onClick={() => map?.zoomOut()}
          className="hidden md:flex"
        />
      </div>
    </div>
  );
};
