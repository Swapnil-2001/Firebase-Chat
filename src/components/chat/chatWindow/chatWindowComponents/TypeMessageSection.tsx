import { useContext, useState } from "react";
import {
  arrayUnion,
  doc,
  getDoc,
  setDoc,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import EmojiPicker, {
  EmojiClickData,
  EmojiStyle,
  Theme,
} from "emoji-picker-react";
import AddPhotoAlternateOutlinedIcon from "@mui/icons-material/AddPhotoAlternateOutlined";
import CancelIcon from "@mui/icons-material/Cancel";
import SendIcon from "@mui/icons-material/Send";
import SentimentSatisfiedOutlinedIcon from "@mui/icons-material/SentimentSatisfiedOutlined";
import { CircularProgress, Fade } from "@mui/material";

import { db, storage } from "../../../../firebase";
import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import {
  ALL_MESSAGES_COLLECTION_NAME,
  SET_SENDING_MESSAGE_LOADING,
  USER_CHATS_COLLECTION_NAME,
} from "../../../../common/constants";
import { white } from "../../../../common/colors";
import {
  CancelIconContainer,
  CancelIconStyles,
  EmojiPickerContainer,
  ImageInputLabelStyles,
  ImageSelectPreview,
  LabelForImageInput,
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
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const { currentUser } = useContext(UserContext);
  const [
    {
      conversationId,
      hideMessageInput,
      messageRecipient,
      sendingMessageLoading,
    },
    dispatch,
  ] = useContext(ChatContext);

  const handleMessageInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;
    setTypedMessage(value);
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.code === "Enter") sendMessage();
  };

  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedImage(event.target?.files && event.target.files[0]);
  };

  const handleRemoveSelectedImage = () => {
    setSelectedImage(null);
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
      sendingMessageLoading ||
      (typedMessage.trim().length === 0 && !selectedImage)
    )
      return;

    setOpenEmojiPicker(false);
    setSelectedImage(null);
    dispatch({ type: SET_SENDING_MESSAGE_LOADING, payload: true });

    let newMessageCreated = {
      id: uuid(),
      messageText: typedMessage.trim(),
      senderId: currentUser.uid,
      date: Timestamp.now(),
      imageUrl: "",
    };

    setTypedMessage("");

    try {
      if (selectedImage) {
        const firebaseStorageUrl = `messageImages/${uuid()}`;
        const messageImageStorageRef = ref(storage, firebaseStorageUrl);

        await uploadBytesResumable(
          messageImageStorageRef,
          selectedImage as File
        );

        const downloadUrl = await getDownloadURL(messageImageStorageRef);

        newMessageCreated = { ...newMessageCreated, imageUrl: downloadUrl };
      }

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
        [`${conversationId}.isRead`]: true,
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
          [`${conversationId}.isRead`]: false,
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <TypeMessageSectionContainer>
      {!hideMessageInput && (
        <>
          {selectedImage && (
            <ImageSelectPreview>
              Image selected
              <CancelIconContainer onClick={handleRemoveSelectedImage}>
                <CancelIcon sx={CancelIconStyles} />
              </CancelIconContainer>
            </ImageSelectPreview>
          )}
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
          <input
            id="imageInput"
            type="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleImageSelect}
            style={{ display: "none" }}
          />
          <LabelForImageInput htmlFor="imageInput">
            <AddPhotoAlternateOutlinedIcon sx={ImageInputLabelStyles} />
          </LabelForImageInput>
          <SelectEmojiIconWrapper onClick={handleOpenOrCloseEmojiPicker}>
            <SentimentSatisfiedOutlinedIcon sx={SelectEmojiIconStyles} />
          </SelectEmojiIconWrapper>
          <SendMessageIconWrapper onClick={sendMessage}>
            {sendingMessageLoading ? (
              <CircularProgress size={25} sx={{ color: white }} />
            ) : (
              <SendIcon sx={{ color: white }} />
            )}
          </SendMessageIconWrapper>
        </>
      )}
    </TypeMessageSectionContainer>
  );
};

export default TypeMessageSection;
