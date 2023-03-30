import { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import SendIcon from "@mui/icons-material/Send";

import { db } from "../../../../firebase";
import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import {
  ALL_MESSAGES_COLLECTION_NAME,
  USER_CHATS_COLLECTION_NAME,
} from "../../../../common/constants";
import { white } from "../../../../common/colors";
import {
  SendMessageIconWrapper,
  TypeMessageInputBox,
  TypeMessageSectionContainer,
} from "../ChatWindow.styles";

const TypeMessageSection = () => {
  const [typedMessage, setTypedMessage] = useState<string>("");

  const { currentUser } = useContext(UserContext);
  const [{ conversationId, messageRecipient }] = useContext(ChatContext);

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
    <TypeMessageSectionContainer>
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
    </TypeMessageSectionContainer>
  );
};

export default TypeMessageSection;
