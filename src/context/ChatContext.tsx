import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

import { MessageRecipient } from "../common/types";
import { SET_NEW_MESSAGE_RECIPIENT } from "../common/constants";

interface ChatInitialState {
  conversationId: string;
  messageRecipient: MessageRecipient | null;
}

const initialState: ChatInitialState = {
  conversationId: "",
  messageRecipient: null,
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
        if (action.payload === null) return initialState;
        const { messageRecipient, conversationId } = action.payload;
        return {
          ...state,
          conversationId,
          messageRecipient,
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
