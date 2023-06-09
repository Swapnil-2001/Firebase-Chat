import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";
import { User } from "firebase/auth";

import { LOGOUT_USER, SET_LOGGED_IN_USER } from "../common/constants";

interface UserInitialState {
  currentUser: User | null;
}

const initialState: UserInitialState = {
  currentUser: null,
};

export const UserContext = createContext<[UserInitialState, Dispatch<any>]>([
  initialState,
  () => {},
]);

const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const userReducer = (
    state: UserInitialState,
    action: { type: string; payload: any }
  ) => {
    switch (action.type) {
      case LOGOUT_USER:
        return initialState;
      case SET_LOGGED_IN_USER:
        if (action.payload === null) return state;
        return {
          ...state,
          currentUser: action.payload,
        };
      default:
        return state;
    }
  };

  const [currentState, dispatch] = useReducer(userReducer, initialState);

  return (
    <UserContext.Provider value={[currentState, dispatch]}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
