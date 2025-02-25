import { useTranslation } from "react-i18next";
import { LayerConfiguration } from "../../map-instance/configuration/layer.configuration";
import { MapInstance } from "../../map-instance/map-instance";

type Props = {
  map: MapInstance;
};

export const LayerControl = (props: Props) => {
  const { t } = useTranslation();
  const map = props.map;
  return (
    <div style={{ zIndex: 10000, position: "absolute", top: 0, left: 0 }}>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          map.setBaseLayer(LayerConfiguration.swisstopoBaseMapLayerId)
        }
      >
        {t("basemap")}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() =>
          map.setBaseLayer(LayerConfiguration.swisstopoImageryBaseMapLayerId)
        }
      >
        {t("satellite")}
      </button>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => map.setBaseLayer(LayerConfiguration.osmLayerId)}
      >
        {t("osm")}
      </button>
    </div>
  );
};
