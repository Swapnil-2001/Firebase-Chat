import { useContext, useState } from "react";
import { Timestamp } from "firebase/firestore";
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

import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import {
  addNewMessageToConversation,
  getImageDownloadUrl,
  updateUserChats,
} from "../../../../common/firebaseFunctions";
import { MessageRecipient } from "../../../../common/types";
import { SET_SENDING_MESSAGE_LOADING } from "../../../../common/constants";
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.code === "Enter") sendMessage();
  };

  const handleMessageInput = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { value } = event.target as HTMLInputElement;
    setTypedMessage(value);
  };

  const handleImageSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setSelectedImage(event.target?.files && event.target.files[0]);
  };

  const handleOpenOrCloseEmojiPicker = (): void => {
    setOpenEmojiPicker((prevValue: boolean) => !prevValue);
  };

  const handleRemoveSelectedImage = (): void => {
    setSelectedImage(null);
  };

  const handleSelectEmoji = (emojiData: EmojiClickData): void => {
    setTypedMessage((prevValue) => prevValue + emojiData.emoji);
  };

  const sendMessage = async (): Promise<void> => {
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
    if (selectedImage) {
      const firebaseStorageUrl = `messageImages/${uuid()}`;
      const downloadUrl = await getImageDownloadUrl(
        firebaseStorageUrl,
        selectedImage
      );
      newMessageCreated = { ...newMessageCreated, imageUrl: downloadUrl };
    }
    await addNewMessageToConversation(conversationId, newMessageCreated);
    await updateUserChats(
      conversationId,
      currentUser.uid,
      messageRecipient,
      typedMessage,
      true
    );
    await updateUserChats(
      conversationId,
      messageRecipient.uid,
      currentUser as MessageRecipient,
      typedMessage,
      false
    );
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
