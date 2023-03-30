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
  MessageReceivedByUser,
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
  date: any;
}

const ChatWindow: React.FC = (): JSX.Element => {
  const [typedMessage, setTypedMessage] = useState<string>("");
  const [conversationMessages, setConversationMessages] = useState<
    ConversationMessage[]
  >([]);

  const { currentUser } = useContext(UserContext);
  const [{ messageRecipient, conversationId }] = useContext(ChatContext);

  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  const scrollToBottom = () => {
    console.log("Here");

    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (conversationMessages.length > 0) scrollToBottom();
  }, [conversationMessages]);

  useEffect(() => {
    setConversationMessages([]);

    if (conversationId.length > 0) {
      const unsubscribe = onSnapshot(
        doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId),
        (document) => {
          if (document.exists()) {
            const conversationMessages = document.data().messages;
            setConversationMessages(conversationMessages);
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
    if (currentUser === null || messageRecipient === null) return;

    setTypedMessage("");

    const newMessageCreated = {
      id: uuid(),
      messageText: typedMessage,
      senderId: currentUser.uid,
      date: Timestamp.now(),
    };

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
        {conversationMessages.map((message) => {
          return message.senderId === currentUser?.uid ? (
            <MessageSentByUser key={message.id}>
              {message.messageText}
            </MessageSentByUser>
          ) : (
            <MessageReceivedByUser key={message.id}>
              {message.messageText}
            </MessageReceivedByUser>
          );
        })}
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
