import { useContext } from "react";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { AppContext } from "../../../../../context/AppContext";
import { ChatContext } from "../../../../../context/ChatContext";
import MessageTime from "./MessageTime";
import { MessageOnWindow } from "../../../../../common/types";
import { SHOW_IMAGE } from "../../../../../common/constants";
import {
  LikedMessageSentIconStyles,
  MessageImage,
  MessageImageContainer,
  MessageSentByUserContainer,
  MessageSentByUserDiv,
} from "../../ChatWindow.styles";

const MessageSentByUser: React.FC<MessageOnWindow> = ({
  handleHoverOnMessage,
  handleImageLoaded,
  isLiked,
  message,
}): JSX.Element => {
  const { date, id, imageUrl, messageText } = message;

  const [{ appThemeColor }] = useContext(AppContext);
  const [, dispatch] = useContext(ChatContext);

  const showMagnifiedImageView = (imageUrl: string): void => {
    dispatch({ type: SHOW_IMAGE, payload: imageUrl });
  };

  return (
    <>
      {imageUrl.length > 0 && (
        <MessageImageContainer
          onClick={() => showMagnifiedImageView(imageUrl)}
          moveToLeft={false}
        >
          <MessageImage
            src={imageUrl}
            onLoad={handleImageLoaded}
            alt="This message was sent by the current user in the conversation."
          />
        </MessageImageContainer>
      )}
      <MessageSentByUserDiv
        onMouseEnter={() => handleHoverOnMessage(id)}
        onMouseLeave={() => handleHoverOnMessage("")}
      >
        <MessageSentByUserContainer background={appThemeColor}>
          {messageText}
          {isLiked && (
            <FavoriteOutlinedIcon
              fontSize="small"
              sx={LikedMessageSentIconStyles}
            />
          )}
          <MessageTime
            time={date.toDate().toLocaleTimeString()}
            moveToLeft={false}
          />
        </MessageSentByUserContainer>
      </MessageSentByUserDiv>
    </>
  );
};

export default MessageSentByUser;
