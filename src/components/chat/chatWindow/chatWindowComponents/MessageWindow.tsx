import { useContext, useEffect, useRef, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";

import { db } from "../../../../firebase";
import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import {
  ALL_MESSAGES_COLLECTION_NAME,
  UNHIDE_MESSAGE_WINDOW,
} from "../../../../common/constants";
import {
  ConversationDateContainer,
  MessageReceivedByUser,
  MessageSentByUser,
  MessageSendTimeContainer,
  MessageWindowContainer,
  MessageImageContainer,
  MessageImage,
} from "../ChatWindow.styles";

interface ConversationDateProps {
  conversationDateString: string | undefined;
  showDate: boolean;
}

interface ConversationMessage {
  id: string;
  senderId: string;
  messageText: string;
  imageUrl: string;
  conversationDateString: string;
  date: any;
  showDate: boolean;
}

interface MessageTimeProps {
  time: string;
  moveToLeft: boolean;
}

const ConversationDate: React.FC<ConversationDateProps> = ({
  conversationDateString,
  showDate,
}): JSX.Element => {
  const dateToday = new Date();

  const day = dateToday.getDate();
  const month = dateToday.getMonth();
  const year = dateToday.getFullYear();
  const formattedDate =
    ("0" + day).slice(-2) + "/" + ("0" + (month + 1)).slice(-2) + "/" + year;

  return (
    <ConversationDateContainer showDate={showDate}>
      {formattedDate === conversationDateString
        ? "Today"
        : conversationDateString}
    </ConversationDateContainer>
  );
};

const MessageTime: React.FC<MessageTimeProps> = ({
  time,
  moveToLeft,
}): JSX.Element => {
  const lengthOfTimeString = time.length;
  return (
    <MessageSendTimeContainer moveToLeft={moveToLeft}>
      {time.substring(0, lengthOfTimeString - 3)}
    </MessageSendTimeContainer>
  );
};

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
  const [{ conversationId }, dispatch] = useContext(ChatContext);

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
    dispatch({ type: UNHIDE_MESSAGE_WINDOW });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [componentJustLoaded, conversationMessages, currentUser?.uid, dispatch]);

  useEffect(() => {
    const container = containerRef.current as Element;
    container.addEventListener("scroll", () => handleScroll(container));
    return () =>
      container.removeEventListener("scroll", () => handleScroll(container));
  }, []);

  const handleScroll = (container: Element): void => {
    const distanceFromBottom =
      container.scrollHeight - container.scrollTop - container.clientHeight;
    setDistanceFromBottom(distanceFromBottom);
  };

  const generateFormattedMessages = (
    conversationMessages: any[]
  ): ConversationMessage[] => {
    const formattedMessages: ConversationMessage[] = [];

    // Decide whether or not to show the date of the conversation
    conversationMessages.forEach((message) => {
      const conversationDate = message.date.toDate() as Date;
      const conversationDateString = conversationDate.toLocaleDateString();
      const numMessagesLoaded = formattedMessages.length;
      if (
        numMessagesLoaded === 0 ||
        formattedMessages[numMessagesLoaded - 1].conversationDateString !==
          conversationDateString
      )
        formattedMessages.push({
          ...message,
          conversationDateString,
          showDate: true,
        });
      else if (
        formattedMessages[numMessagesLoaded - 1].conversationDateString ===
        conversationDateString
      )
        formattedMessages.push({
          ...message,
          conversationDateString,
          showDate: false,
        });
    });
    return formattedMessages;
  };

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "auto" });
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
              {imageUrl.length > 0 && (
                <MessageImageContainer moveToLeft={false}>
                  <MessageImage src={imageUrl} />
                </MessageImageContainer>
              )}
              <MessageSentByUser>
                {messageText}
                <MessageTime
                  time={date.toDate().toLocaleTimeString()}
                  moveToLeft={false}
                />
              </MessageSentByUser>
            </div>
          ) : (
            <div key={id}>
              <ConversationDate
                conversationDateString={conversationDateString}
                showDate={showDate}
              />
              {imageUrl.length > 0 && (
                <MessageImageContainer moveToLeft={true}>
                  <MessageImage src={imageUrl} />
                </MessageImageContainer>
              )}
              <MessageReceivedByUser>
                {messageText}
                <MessageTime
                  time={date.toDate().toLocaleTimeString()}
                  moveToLeft={true}
                />
              </MessageReceivedByUser>
            </div>
          );
        }
      )}
      <div ref={messagesEndRef} />
    </MessageWindowContainer>
  );
};

export default MessageWindow;
