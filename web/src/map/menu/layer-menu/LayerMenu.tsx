import { useContext } from "react";
import { useTranslation } from "react-i18next";
import { Context as MapContext } from "../../context/MapContext";
import { LayerType } from "../../openlayers/configuration/layer.configuration";
import { SubMenuProps } from "../Menu";
import "./LayerMenu.css";
import { LayerSwitch } from "./layer-switch/LayerSwitch";

export const LayerMenu = (props: SubMenuProps) => {
  const { t } = useTranslation();
  const { state, setLayerVisible } = useContext(MapContext);

  const toggleLayer = (layer: LayerType) => {
    const isVisible = isLayerVisible(layer);
    setLayerVisible(layer, !isVisible);
  };
  const isLayerVisible = (layer: LayerType) => state.includes(layer);

  return (
    <div hidden={props.hidden} className="layer-menu-container">
      <p className="fs-4 m-0">{t("layer_settings")}</p>
      <div className="card">
        <div className="card-header">
          <p className="layer-menu-layer-group-title fs-6">{t("base_layer")}</p>
        </div>
        <div className="layer-menu-layer-group">
          <LayerSwitch
            name={t("osm_swiss")}
            setVisible={() => toggleLayer(LayerType.OSM_SWISS)}
            isVisible={isLayerVisible(LayerType.OSM_SWISS)}
          />
          <LayerSwitch
            name={t("osm_common")}
            setVisible={() => toggleLayer(LayerType.OSM_COMMON)}
            isVisible={isLayerVisible(LayerType.OSM_COMMON)}
          />
          <LayerSwitch
            name={t("swisstopo")}
            setVisible={() => toggleLayer(LayerType.SWISSTOPO)}
            isVisible={isLayerVisible(LayerType.SWISSTOPO)}
          />
          <LayerSwitch
            name={t("satellite")}
            setVisible={() => toggleLayer(LayerType.SATELLITE)}
            isVisible={isLayerVisible(LayerType.SATELLITE)}
          />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <p className="layer-menu-layer-group-title fs-6">{t("aed_layers")}</p>
        </div>
        <div className="layer-menu-layer-group">
          <LayerSwitch
            name={t("aed_247")}
            setVisible={() => toggleLayer(LayerType.AED247)}
            isVisible={isLayerVisible(LayerType.AED247)}
          />
          <LayerSwitch
            name={t("aed_day")}
            setVisible={() => toggleLayer(LayerType.AED_DAY)}
            isVisible={isLayerVisible(LayerType.AED_DAY)}
          />
          <LayerSwitch
            name={t("aed_by_opening_hours")}
            setVisible={() => toggleLayer(LayerType.AED_BY_OPENING_HOURS)}
            isVisible={isLayerVisible(LayerType.AED_BY_OPENING_HOURS)}
          />
        </div>
      </div>
    </div>
  );
};
