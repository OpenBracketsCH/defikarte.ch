import React from 'react';
import { LayerId } from '../../../model/map';
import { MapConfiguration } from '../configuration/map.configuration';

type ActionType = {
  type: 'enable' | 'disable';
  payload: LayerId;
};

export const useLayerVisibility = (initialState: LayerId[]) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const setLayerVisibleCallback = React.useCallback(
    (layerType: LayerId, setVisible: boolean) => {
      dispatch({ type: setVisible ? 'enable' : 'disable', payload: layerType });
    },
    [dispatch]
  );

  return { state, setLayerVisible: setLayerVisibleCallback };
};

const handleGroupConstraint = (state: LayerId[], action: ActionType) => {
  MapConfiguration.layerGroups.forEach(group => {
    if (group.includes(action.payload)) {
      group.forEach(layer => {
        if (layer !== action.payload) {
          state = state.filter(x => x !== layer);
        }
      });
    }
  });

  return [...state, action.payload];
};

const reducer = (state: LayerId[], action: ActionType) => {
  switch (action.type) {
    case 'enable':
      return handleGroupConstraint(state, action);
    case 'disable':
      return state.filter(x => x !== action.payload);
    default:
      return state;
  }
};
