import { useContext } from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteOutlinedIcon from "@mui/icons-material/FavoriteOutlined";

import { ChatContext } from "../../../../../context/ChatContext";
import MessageTime from "./MessageTime";
import { MessageOnWindow } from "../../../../../common/types";
import { SHOW_IMAGE } from "../../../../../common/constants";
import {
  LikeButtonContainer,
  LikeButtonStyles,
  LikedMessageReceivedIconStyles,
  MessageImage,
  MessageImageContainer,
  MessageReceivedByUserContainer,
  MessageReceivedByUserDiv,
} from "../../ChatWindow.styles";
import { likeMessage } from "../../../../../common/firebaseFunctions";

const MessageReceivedByUser: React.FC<MessageOnWindow> = ({
  handleHoverOnMessage,
  handleImageLoaded,
  idOfMessageHoveredOver,
  isLiked,
  message,
}): JSX.Element => {
  const { date, id, imageUrl, messageText } = message;

  const [{ conversationId }, dispatch] = useContext(ChatContext);

  const showMagnifiedImageView = (imageUrl: string): void => {
    dispatch({ type: SHOW_IMAGE, payload: imageUrl });
  };

  return (
    <>
      {imageUrl.length > 0 && (
        <MessageImageContainer
          onClick={() => showMagnifiedImageView(imageUrl)}
          moveToLeft={true}
        >
          <MessageImage
            src={imageUrl}
            onLoad={handleImageLoaded}
            alt="This message was sent by the other user in the conversation."
          />
        </MessageImageContainer>
      )}
      <MessageReceivedByUserDiv
        onMouseEnter={() => handleHoverOnMessage(id)}
        onMouseLeave={() => handleHoverOnMessage("")}
      >
        <MessageReceivedByUserContainer>
          {isLiked && (
            <FavoriteOutlinedIcon
              fontSize="small"
              sx={LikedMessageReceivedIconStyles}
            />
          )}
          {messageText}
          <MessageTime
            time={date.toDate().toLocaleTimeString()}
            moveToLeft={true}
          />
        </MessageReceivedByUserContainer>
        {id === idOfMessageHoveredOver && (
          <LikeButtonContainer onClick={() => likeMessage(conversationId, id)}>
            {isLiked ? (
              <FavoriteOutlinedIcon fontSize="small" sx={LikeButtonStyles} />
            ) : (
              <FavoriteBorderIcon fontSize="small" sx={LikeButtonStyles} />
            )}
          </LikeButtonContainer>
        )}
      </MessageReceivedByUserDiv>
    </>
  );
};

export default MessageReceivedByUser;
