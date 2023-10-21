import {
  LayerType,
  layerGroups,
} from "../openlayers/configuration/layer.configuration";
import createDataContext from "./createDataContext";

const initialState: LayerType[] = [];
type ActionType = {
  type: "enable" | "disable";
  payload: LayerType;
};

const handleGroupConstraint = (state: LayerType[], action: ActionType) => {
  layerGroups.forEach((group) => {
    if (group.includes(action.payload)) {
      group.forEach((layer) => {
        if (layer !== action.payload) {
          state = state.filter((x) => x !== layer);
        }
      });
    }
  });

  return [...state, action.payload];
};

const reducer = (state: LayerType[], action: ActionType) => {
  switch (action.type) {
    case "enable":
      return handleGroupConstraint(state, action);
    case "disable":
      return state.filter((x) => x !== action.payload);
    default:
      return state;
  }
};

const setLayerVisible =
  (dispatch: any) => (layerType: LayerType, setVisible: boolean) => {
    dispatch({ type: setVisible ? "enable" : "disable", payload: layerType });
  };

export const { Context, Provider } = createDataContext(
  reducer,
  { setLayerVisible },
  initialState
);
