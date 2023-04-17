import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

import { OPEN_SETTINGS_MODAL, SET_APP_THEME_COLOR } from "../common/constants";

interface AppInitialState {
  appThemeColor: string;
  openSettingsModal: boolean;
}

const initialState: AppInitialState = {
  appThemeColor: "#655DBB",
  openSettingsModal: false,
};

export const AppContext = createContext<[AppInitialState, Dispatch<any>]>([
  initialState,
  () => {},
]);

const AppContextProvider: React.FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const appReducer = (
    state: AppInitialState,
    action: { type: string; payload: any }
  ) => {
    switch (action.type) {
      case OPEN_SETTINGS_MODAL:
        if (action.payload === null) return state;
        return {
          ...state,
          openSettingsModal: action.payload,
        };
      case SET_APP_THEME_COLOR:
        if (action.payload === null) return state;
        return {
          ...state,
          appThemeColor: action.payload,
        };
      default:
        return state;
    }
  };

  const [currentState, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={[currentState, dispatch]}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
