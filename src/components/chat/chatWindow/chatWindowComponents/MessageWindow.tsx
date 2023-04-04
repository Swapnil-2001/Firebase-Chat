import { useContext, useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../../../firebase";
import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import ConversationDate from "./message/ConversationDate";
import MessageReceivedByUser from "./message/MessageReceivedByUser";
import MessageSentByUser from "./message/MessageSentByUser";
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
  const [distanceFromBottom, setDistanceFromBottom] = useState<number>(0);
  const [componentJustLoaded, setComponentJustLoaded] = useState<boolean>(true);

  const { currentUser } = useContext(UserContext);
  const [
    {
      conversationId,
      hideMessageWindow,
      messageRecipient,
      unreadConversations,
    },
    dispatch,
  ] = useContext(ChatContext);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);
  const containerRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    setComponentJustLoaded(true);
    setConversationMessages([]);

    if (conversationId.length > 0) {
      const unsubscribe = onSnapshot(
        doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId),
        (document) => {
          if (document.exists()) {
            const conversationMessages: any[] = document.data().messages;

            const formattedMessages =
              generateFormattedMessages(conversationMessages);

            setConversationMessages(formattedMessages);
          }
        }
      );
      return () => unsubscribe();
    }
    return;
  }, [conversationId]);

  useEffect(() => {
    const numConversations = conversationMessages.length;
    if (numConversations > 0) {
      if (componentJustLoaded) {
        scrollToBottom();
        setComponentJustLoaded(false);
      } else if (
        conversationMessages[numConversations - 1].senderId ===
          currentUser?.uid ||
        distanceFromBottom < 300
      )
        scrollToBottom();
    }
    dispatch({ type: SET_SENDING_MESSAGE_LOADING, payload: false });
    const timer = setTimeout(() => {
      dispatch({ type: UNHIDE_MESSAGE_WINDOW });
    }, 1800);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    componentJustLoaded,
    conversationMessages,
    currentUser?.uid,
    dispatch,
    hideMessageWindow,
  ]);

  useEffect(() => {
    const container = containerRef.current as Element;
    container.addEventListener("scroll", () => handleScroll(container));
    return () =>
      container.removeEventListener("scroll", () => handleScroll(container));
  }, []);

  useEffect(() => {
    if (distanceFromBottom < 300 && messageRecipient) {
      const messageRecipientId = messageRecipient.uid;
      if (messageRecipientId in unreadConversations)
        dispatch({
          type: SET_UNREAD_CONVERSATIONS,
          payload: { ...unreadConversations, [messageRecipientId]: false },
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, distanceFromBottom]);

  const handleImageLoaded = (): void => {
    scrollToBottom();
  };

  const handleScroll = (container: Element): void => {
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    setDistanceFromBottom(distanceFromBottom);
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleCloseEmojiPicker = () => {
    setOpenEmojiPicker(false);
  };

  return (
    <MessageWindowContainer
      onClick={handleCloseEmojiPicker}
      ref={containerRef}
      className="messageWindowDiv"
    >
      {conversationMessages.map(
        ({
          conversationDateString,
          date,
          messageText,
          id,
          imageUrl,
          senderId,
          showDate,
        }) => {
          return senderId === currentUser?.uid ? (
            <div key={id}>
              <ConversationDate
                conversationDateString={conversationDateString}
                showDate={showDate}
              />
              <MessageSentByUser
                date={date}
                handleImageLoaded={handleImageLoaded}
                imageUrl={imageUrl}
                messageText={messageText}
              />
            </div>
          ) : (
            <div key={id}>
              <ConversationDate
                conversationDateString={conversationDateString}
                showDate={showDate}
              />
              <MessageReceivedByUser
                date={date}
                handleImageLoaded={handleImageLoaded}
                imageUrl={imageUrl}
                messageText={messageText}
              />
            </div>
          );
        }
      )}
      <div ref={messagesEndRef} />
    </MessageWindowContainer>
  );
};

export default MessageWindow;
