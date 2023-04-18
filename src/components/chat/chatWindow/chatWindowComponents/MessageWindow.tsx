import { useContext, useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../../../firebase";
import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import ConversationDate from "./message/ConversationDate";
import MessageReceivedByUser from "./message/MessageReceivedByUser";
import MessageSentByUser from "./message/MessageSentByUser";
import { setConversationAsRead } from "../../../../common/firebaseFunctions";
import { generateFormattedMessages } from "../../../../common/utils";
import { ConversationMessage } from "../../../../common/types";
import {
  ALL_MESSAGES_COLLECTION_NAME,
  SET_SENDING_MESSAGE_LOADING,
  SET_UNREAD_CONVERSATIONS,
  UNHIDE_MESSAGE_WINDOW,
} from "../../../../common/constants";
import { MessageWindowContainer } from "../ChatWindow.styles";

interface MessageWindowProps {
  setOpenEmojiPicker: (_: boolean) => void;
}

const MessageWindow: React.FC<MessageWindowProps> = ({
  setOpenEmojiPicker,
}): JSX.Element => {
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessage[]
  >([]);
  const [isDistanceFromBottomAbove300, setIsDistanceFromBottomAbove300] =
    useState<boolean>(false);
  const [componentJustLoaded, setComponentJustLoaded] = useState<boolean>(true);
  const [idOfMessageHoveredOver, setIdOfMessageHoveredOver] =
    useState<string>("");

  const { currentUser } = useContext(UserContext);
  const [{ conversationId, messageRecipient, unreadConversations }, dispatch] =
    useContext(ChatContext);

  const currentUserId = currentUser?.uid;
  const messageRecipientId = messageRecipient?.uid;

  const messagesEndRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);
  const containerRef: React.MutableRefObject<HTMLDivElement | null> =
    useRef<HTMLDivElement>(null);

  // Fetch all messages in the conversation and format them. Should
  // run only once, if a conversationId exists.
  useEffect(() => {
    setComponentJustLoaded(true);
    setConversationMessages([]);
    if (conversationId.length > 0) {
      const docReference = doc(
        db,
        ALL_MESSAGES_COLLECTION_NAME,
        conversationId
      );
      const unsubscribe = onSnapshot(docReference, (document) => {
        if (document.exists()) {
          const conversationMessages: any[] = document.data().messages;
          const formattedMessages =
            generateFormattedMessages(conversationMessages);
          setConversationMessages(formattedMessages);
        }
      });
      return () => unsubscribe();
    }
    return;
  }, [conversationId]);

  // Handle scrolling to bottom
  // We want to scroll to bottom if:
  // 1. The component just loaded, or
  // 2. The last message was sent by the current user, or
  // 3. The user has not scrolled too far up when the new message arrives
  useEffect(() => {
    const numConversations = conversationMessages.length;
    if (numConversations > 0) {
      if (componentJustLoaded) {
        scrollToBottom();
        setComponentJustLoaded(false);
      } else if (
        conversationMessages[numConversations - 1].senderId === currentUserId ||
        !isDistanceFromBottomAbove300
      )
        scrollToBottom();
    }
    dispatch({ type: SET_SENDING_MESSAGE_LOADING, payload: false });
    const timer: NodeJS.Timeout = setTimeout(() => {
      dispatch({ type: UNHIDE_MESSAGE_WINDOW });
    }, 1700);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentJustLoaded, conversationMessages, currentUserId, dispatch]);

  // Handle setting the conversation as 'READ'
  // 1. There should be messages in the conversation
  // 2. Should run when new message(s) have been added to the conversation
  // 3. The user shouldn't have scrolled too far up
  useEffect(() => {
    const handleSetConversationAsRead = async (): Promise<void> => {
      if (currentUserId)
        await setConversationAsRead(conversationId, currentUserId);
    };
    if (
      conversationMessages.length > 0 &&
      messageRecipientId &&
      unreadConversations.has(messageRecipientId) &&
      !isDistanceFromBottomAbove300
    ) {
      unreadConversations.delete(messageRecipientId);
      dispatch({
        type: SET_UNREAD_CONVERSATIONS,
        payload: unreadConversations,
      });
      handleSetConversationAsRead();
    }
  }, [
    conversationId,
    conversationMessages.length,
    currentUserId,
    dispatch,
    isDistanceFromBottomAbove300,
    messageRecipientId,
    unreadConversations,
  ]);

  useEffect(() => {
    const container = containerRef.current as Element;
    container.addEventListener("scroll", () => handleScroll(container));
    return () =>
      container.removeEventListener("scroll", () => handleScroll(container));
  }, []);

  const handleCloseEmojiPicker = (): void => {
    setOpenEmojiPicker(false);
  };

  const handleHoverOnMessage = (messageId: string): void => {
    setIdOfMessageHoveredOver(messageId);
  };

  const handleImageLoaded = (): void => {
    scrollToBottom();
  };

  const handleScroll = (container: Element): void => {
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    setIsDistanceFromBottomAbove300(distanceFromBottom > 300);
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
  };

  return (
    <MessageWindowContainer
      onClick={handleCloseEmojiPicker}
      ref={containerRef}
      className="messageWindowDiv"
    >
      {conversationMessages.map((message) => {
        const { conversationDateString, id, isLiked, senderId, showDate } =
          message;
        return senderId === currentUserId ? (
          <div key={id}>
            <ConversationDate
              conversationDateString={conversationDateString}
              showDate={showDate}
            />
            <MessageSentByUser
              handleHoverOnMessage={handleHoverOnMessage}
              handleImageLoaded={handleImageLoaded}
              isLiked={isLiked}
              message={message}
            />
          </div>
        ) : (
          <div key={id}>
            <ConversationDate
              conversationDateString={conversationDateString}
              showDate={showDate}
            />
            <MessageReceivedByUser
              handleHoverOnMessage={handleHoverOnMessage}
              handleImageLoaded={handleImageLoaded}
              idOfMessageHoveredOver={idOfMessageHoveredOver}
              isLiked={isLiked}
              message={message}
            />
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </MessageWindowContainer>
  );
};

export default MessageWindow;
