import { useTranslation } from 'react-i18next';
import { LayerId } from '../../../../model/map';
import { SubMenuProps } from '../Menu';
import './LayerMenu.css';
import { LayerSwitch } from './layer-switch/LayerSwitch';

interface Props extends SubMenuProps {
  enabledLayers: LayerId[];
  setLayerVisible: (layer: LayerId, visible: boolean) => void;
}

export const LayerMenu = (props: Props) => {
  const { t } = useTranslation();

  const toggleLayer = (layer: LayerId) => {
    const isVisible = isLayerVisible(layer);
    props.setLayerVisible(layer, !isVisible);
  };

  const isLayerVisible = (layer: LayerId) => props.enabledLayers.includes(layer);

  return (
    <div hidden={props.hidden} className="layer-menu-container mobile">
      <p className="layer-menu-title">{t('layer_settings')}</p>
      <p className="layer-menu-layer-group-title">{t('base_layer')}</p>
      <div className="layer-menu-layer-group">
        <LayerSwitch
          name={t('osm_swiss')}
          setVisible={() => toggleLayer(LayerId.OsmSwiss)}
          isVisible={isLayerVisible(LayerId.OsmSwiss)}
        />
        <LayerSwitch
          name={t('osm_common')}
          setVisible={() => toggleLayer(LayerId.OsmCommon)}
          isVisible={isLayerVisible(LayerId.OsmCommon)}
        />
        <LayerSwitch
          name={t('swisstopo')}
          setVisible={() => toggleLayer(LayerId.Swisstopo)}
          isVisible={isLayerVisible(LayerId.Swisstopo)}
        />
        <LayerSwitch
          name={t('satellite')}
          setVisible={() => toggleLayer(LayerId.Satellite)}
          isVisible={isLayerVisible(LayerId.Satellite)}
        />
      </div>
      <p className="layer-menu-layer-group-title">{t('aed_layers')}</p>
      <div className="layer-menu-layer-group">
        <LayerSwitch
          name={t('aed_247')}
          setVisible={() => toggleLayer(LayerId.Aed247)}
          isVisible={isLayerVisible(LayerId.Aed247)}
        />
        <LayerSwitch
          name={t('aed_day')}
          setVisible={() => toggleLayer(LayerId.AedRestricted)}
          isVisible={isLayerVisible(LayerId.AedRestricted)}
        />
        <LayerSwitch
          name={t('aed_by_opening_hours')}
          setVisible={() => toggleLayer(LayerId.AedByOpeningHours)}
          isVisible={isLayerVisible(LayerId.AedByOpeningHours)}
        />
      </div>
    </div>
  );
};
