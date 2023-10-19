import { useTranslation } from "react-i18next";
import { SubMenuProps } from "../Menu";
import "./LayerMenu.css";
import { LayerSwitch } from "./layer-switch/LayerSwitch";
import { LayerType } from "../../openlayers/constants/layers";

export const LayerMenu = (props: SubMenuProps) => {
  const { t } = useTranslation();

  return (
    <div hidden={props.hidden} className="layer-menu-container">
      <p className="fs-4 m-0">{t("layer_settings")}</p>
      <div className="card">
        <div className="card-header">
          <p className="layer-menu-layer-group-title fs-6">{t("base_layer")}</p>
        </div>
        <div className="layer-menu-layer-group">
          <LayerSwitch name={t("osm_swiss")} type={LayerType.OsmSwiss} />
          <LayerSwitch name={t("osm_common")} type={LayerType.OsmCommon} />
          <LayerSwitch name={t("swisstopo")} type={LayerType.Swisstopo} />
          <LayerSwitch name={t("satellite")} />
        </div>
      </div>
      <div className="card">
        <div className="card-header">
          <p className="layer-menu-layer-group-title fs-6">{t("aed_layers")}</p>
        </div>
        <div className="layer-menu-layer-group">
          <LayerSwitch name={t("aed_247")} type={LayerType.Aed247} />
          <LayerSwitch name={t("aed_day")} type={LayerType.AedDay} />
          <LayerSwitch
            name={t("aed_by_opening_hours")}
            type={LayerType.AedByOpeningHours}
          />
        </div>
      </div>
    </div>
  );
};
