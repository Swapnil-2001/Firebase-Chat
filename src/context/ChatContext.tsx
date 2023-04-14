import { createContext, Dispatch, PropsWithChildren, useReducer } from "react";

import { MessageRecipient } from "../common/types";
import {
  ARE_FRESH_CONVERSATIONS_LOADED,
  RESET_TO_DEFAULT_VALUES,
  SET_NEW_MESSAGE_RECIPIENT,
  SET_SENDING_MESSAGE_LOADING,
  SHOW_IMAGE,
  UNHIDE_MESSAGE_WINDOW,
} from "../common/constants";

interface ChatInitialState {
  conversationId: string;
  freshConversationsLoaded: boolean;
  hideMessageInput: boolean;
  // < 2 --> hide message window
  // === 1 --> show loading animation
  // >= 2 --> show message window
  hideMessageWindow: number;
  magnifiedImageUrl: string;
  messageRecipient: MessageRecipient | null;
  sendingMessageLoading: boolean;
}

const initialState: ChatInitialState = {
  conversationId: "",
  freshConversationsLoaded: false,
  hideMessageInput: true,
  hideMessageWindow: 0,
  magnifiedImageUrl: "",
  messageRecipient: null,
  sendingMessageLoading: false,
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
      case ARE_FRESH_CONVERSATIONS_LOADED:
        if (action.payload === null) return state;
        return {
          ...state,
          freshConversationsLoaded: action.payload,
        };
      case RESET_TO_DEFAULT_VALUES:
        return initialState;
      case SET_NEW_MESSAGE_RECIPIENT:
        if (action.payload === null) return state;
        const { conversationId, messageRecipient } = action.payload;
        return {
          ...state,
          conversationId,
          hideMessageInput: false,
          hideMessageWindow: 1,
          messageRecipient,
        };
      case SET_SENDING_MESSAGE_LOADING:
        if (action.payload === null) return state;
        return {
          ...state,
          sendingMessageLoading: action.payload,
        };
      case SHOW_IMAGE:
        if (action.payload === null) return state;
        return { ...state, magnifiedImageUrl: action.payload };
      case UNHIDE_MESSAGE_WINDOW:
        return {
          ...state,
          hideMessageWindow: 2,
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
