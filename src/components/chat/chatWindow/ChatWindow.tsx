import { useContext, useEffect, useRef, useState } from "react";
import { v4 as uuid } from "uuid";
import SendIcon from "@mui/icons-material/Send";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";

import { db } from "../../../firebase";
import { ChatContext } from "../../../context/ChatContext";
import { UserContext } from "../../../context/UserContext";
import {
  ChatWindowContainer,
  ChatWindowNavbar,
  ChatWindowNavbarImage,
  ChatWindowNavbarText,
  ChatWindowNavbarUserName,
  ConversationDateContainer,
  MessageReceivedByUser,
  MessageSendTimeContainer,
  MessageSentByUser,
  MessageWindow,
  SendMessageIconWrapper,
  TypeMessageInputBox,
  TypeMessageSection,
} from "./ChatWindow.styles";
import {
  ALL_MESSAGES_COLLECTION_NAME,
  USER_CHATS_COLLECTION_NAME,
} from "../../../common/constants";
import { white } from "../../../common/colors";

interface ConversationMessage {
  id: string;
  senderId: string;
  messageText: string;
  conversationDateString: string;
  date: any;
  showDate: boolean;
}

interface ConversationDateProps {
  conversationDateString: string | undefined;
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

const ChatWindow: React.FC = (): JSX.Element => {
  const [typedMessage, setTypedMessage] = useState<string>("");
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessage[]
  >([]);

  const { currentUser } = useContext(UserContext);
  const [{ messageRecipient, conversationId }] = useContext(ChatContext);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (conversationMessages.length > 0) {
      scrollToBottom();
    }
  }, [conversationMessages]);

  useEffect(() => {
    setConversationMessages([]);

    if (conversationId.length > 0) {
      const unsubscribe = onSnapshot(
        doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId),
        (document) => {
          if (document.exists()) {
            const conversationMessages = document.data()
              .messages as ConversationMessage[];

            const formattedMessages: ConversationMessage[] = [];

            // Decide whether or not to show the date of the conversation
            conversationMessages.forEach((message) => {
              const conversationDate = message.date.toDate() as Date;
              const conversationDateString =
                conversationDate.toLocaleDateString();
              const numMessagesLoaded = formattedMessages.length;
              if (
                numMessagesLoaded === 0 ||
                formattedMessages[numMessagesLoaded - 1]
                  .conversationDateString !== conversationDateString
              )
                formattedMessages.push({
                  ...message,
                  conversationDateString,
                  showDate: true,
                });
              else if (
                formattedMessages[numMessagesLoaded - 1]
                  .conversationDateString === conversationDateString
              )
                formattedMessages.push({
                  ...message,
                  conversationDateString,
                  showDate: false,
                });
            });

            setConversationMessages(formattedMessages);
          }
        }
      );

      return () => unsubscribe();
    }

    return;
  }, [conversationId]);

  const handleMessageInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setTypedMessage(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.code === "Enter") sendMessage();
  };

  const sendMessage = async () => {
    if (
      currentUser === null ||
      messageRecipient === null ||
      typedMessage.trim().length === 0
    )
      return;

    const newMessageCreated = {
      id: uuid(),
      messageText: typedMessage.trim(),
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };

    setTypedMessage("");

    try {
      const docRef = doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId);
      const docSnap = await getDoc(docRef);

      if (!docSnap.exists()) {
        await setDoc(doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId), {
          messages: [newMessageCreated],
        });
      } else {
        await updateDoc(doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId), {
          messages: arrayUnion(newMessageCreated),
        });
      }

      await updateDoc(doc(db, USER_CHATS_COLLECTION_NAME, currentUser.uid), {
        [`${conversationId}.userInfo`]: {
          uid: messageRecipient.uid,
          displayName: messageRecipient.displayName,
          photoURL: messageRecipient.photoURL,
        },
        [`${conversationId}.lastMessage`]: {
          messageText: typedMessage,
        },
        [`${conversationId}.date`]: serverTimestamp(),
      });

      await updateDoc(
        doc(db, USER_CHATS_COLLECTION_NAME, messageRecipient.uid),
        {
          [`${conversationId}.userInfo`]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [`${conversationId}.lastMessage`]: {
            messageText: typedMessage,
          },
          [`${conversationId}.date`]: serverTimestamp(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ChatWindowContainer>
      <ChatWindowNavbar>
        {messageRecipient ? (
          <>
            <ChatWindowNavbarImage src={messageRecipient.photoURL} />
            <ChatWindowNavbarUserName>
              {messageRecipient.displayName}
            </ChatWindowNavbarUserName>
          </>
        ) : (
          <>
            <ChatWindowNavbarText>Start a conversation</ChatWindowNavbarText>
          </>
        )}
      </ChatWindowNavbar>
      <MessageWindow>
        {conversationMessages.map(
          ({
            conversationDateString,
            date,
            messageText,
            id,
            senderId,
            showDate,
          }) => {
            return senderId === currentUser?.uid ? (
              <div key={id}>
                <ConversationDate
                  conversationDateString={conversationDateString}
                  showDate={showDate}
                />
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
      </MessageWindow>
      <TypeMessageSection>
        <TypeMessageInputBox
          type="text"
          placeholder="Type a message..."
          value={typedMessage}
          onChange={handleMessageInput}
          onKeyDown={handleKeyPress}
        />
        <SendMessageIconWrapper onClick={sendMessage}>
          <SendIcon sx={{ color: white }} />
        </SendMessageIconWrapper>
      </TypeMessageSection>
    </ChatWindowContainer>
  );
};

export default ChatWindow;
