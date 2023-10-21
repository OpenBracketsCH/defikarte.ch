import React, { useReducer, createContext, ReactNode } from "react";

interface Actions {
  [key: string]: (dispatch: React.Dispatch<any>) => any;
}

interface Props {
  children: ReactNode;
}

interface ContextValue {
  state: any;
  [key: string]: any;
}

const createDataContext = (
  reducer: React.Reducer<any, any>,
  actions: Actions,
  initialState: any
) => {
  const Context = createContext<ContextValue>(initialState);

  const Provider: React.FC<Props> = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    const boundActions: Actions = {};
    for (let key in actions) {
      boundActions[key] = actions[key](dispatch);
    }

    return (
      <Context.Provider value={{ state, ...boundActions }}>
        {children}
      </Context.Provider>
    );
  };

  return { Context, Provider };
};

export default createDataContext;
