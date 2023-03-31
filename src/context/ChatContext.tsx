import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

import { MessageRecipient } from "../common/types";
import {
  SET_NEW_MESSAGE_RECIPIENT,
  UNHIDE_MESSAGE_WINDOW,
} from "../common/constants";

interface ChatInitialState {
  conversationId: string;
  messageRecipient: MessageRecipient | null;
  hideMessageWindow: boolean;
}

const initialState: ChatInitialState = {
  conversationId: "",
  messageRecipient: null,
  hideMessageWindow: true,
};

export const ChatContext = createContext<[ChatInitialState, Dispatch<any>]>([
  initialState,
  () => {},
]);

const ChatContextProvider: React.FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const chatReducer = (
    state: ChatInitialState,
    action: { type: string; payload: any }
  ) => {
    switch (action.type) {
      case SET_NEW_MESSAGE_RECIPIENT:
        if (!action.payload) return initialState;
        const { conversationId, messageRecipient } = action.payload;
        return {
          ...state,
          conversationId,
          messageRecipient,
          hideMessageWindow: true,
        };
      case UNHIDE_MESSAGE_WINDOW:
        return {
          ...state,
          hideMessageWindow: false,
        };
      default:
        return state;
    }
  };

  const [currentState, dispatch] = useReducer(chatReducer, initialState);

  return (
    <ChatContext.Provider value={[currentState, dispatch]}>
      {children}
    </ChatContext.Provider>
  );
};

export default ChatContextProvider;
