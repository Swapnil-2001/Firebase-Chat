import { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { v4 as uuid } from "uuid";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { Fade } from "@mui/material";

import { db } from "../../../../firebase";
import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import {
  ALL_MESSAGES_COLLECTION_NAME,
  USER_CHATS_COLLECTION_NAME,
} from "../../../../common/constants";
import { white } from "../../../../common/colors";
import {
  EmojiPickerContainer,
  SelectEmojiIconStyles,
  SelectEmojiIconWrapper,
  SendMessageIconWrapper,
  TypeMessageInputBox,
  TypeMessageSectionContainer,
} from "../ChatWindow.styles";

interface TypeMessageSectionProps {
  openEmojiPicker: boolean;
  setOpenEmojiPicker: (_: any) => void;
}

const TypeMessageSection: React.FC<TypeMessageSectionProps> = ({
  openEmojiPicker,
  setOpenEmojiPicker,
}): JSX.Element => {
  const [typedMessage, setTypedMessage] = useState<string>("");

  const { currentUser } = useContext(UserContext);
  const [{ conversationId, messageRecipient, hideMessageInput }] =
    useContext(ChatContext);

  const handleMessageInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setTypedMessage(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.code === "Enter") sendMessage();
  };

  const handleSelectEmoji = (emojiData: EmojiClickData) => {
    setTypedMessage((prevValue) => prevValue + emojiData.emoji);
  };

  const handleOpenOrCloseEmojiPicker = () => {
    setOpenEmojiPicker((prevValue: boolean) => !prevValue);
  };

  const sendMessage = async () => {
    if (
      currentUser === null ||
      messageRecipient === null ||
      typedMessage.trim().length === 0
    )
      return;

    setOpenEmojiPicker(false);

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
        [`${conversationId}.date`]: Timestamp.now(),
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
          [`${conversationId}.date`]: Timestamp.now(),
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  if (hideMessageInput) return <></>;

  return (
    <TypeMessageSectionContainer>
      <TypeMessageInputBox
        type="text"
        placeholder="Type a message..."
        value={typedMessage}
        onChange={handleMessageInput}
        onKeyDown={handleKeyPress}
      />
      <Fade in={openEmojiPicker} timeout={250}>
        <EmojiPickerContainer>
          <EmojiPicker
            onEmojiClick={handleSelectEmoji}
            autoFocusSearch={false}
            emojiStyle={EmojiStyle.TWITTER}
            height={350}
            width={290}
            theme={Theme.DARK}
          />
        </EmojiPickerContainer>
      </Fade>
      <SelectEmojiIconWrapper onClick={handleOpenOrCloseEmojiPicker}>
        <SentimentSatisfiedOutlinedIcon sx={SelectEmojiIconStyles} />
      </SelectEmojiIconWrapper>
      <SendMessageIconWrapper onClick={sendMessage}>
        <SendIcon sx={{ color: white }} />
      </SendMessageIconWrapper>
    </TypeMessageSectionContainer>
  );
};

export default TypeMessageSection;
