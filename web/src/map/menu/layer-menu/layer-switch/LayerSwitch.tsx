import { LayerType } from "../../../openlayers/constants/layers";
import {
  disableLayer,
  enableLayer,
  isLayerEnabled,
} from "../../../openlayers/services/map-functions.service";

type Props = {
  name: string;
  type?: LayerType;
};

export const LayerSwitch = (props: Props) => {
  const onToggleLayer = () => {
    if (props.type) {
      console.log("toggle layer", props.type);
      if (isLayerEnabled(props.type)) {
        disableLayer(props.type);
      } else {
        enableLayer(props.type);
      }
    }
  };

  return (
    <div className="form-check form-switch">
      <input
        className="form-check-input"
        type="checkbox"
        id="flexSwitchCheckDefault"
        onChange={() => onToggleLayer()}
      />
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        {props.name}
      </label>
    </div>
  );
};
