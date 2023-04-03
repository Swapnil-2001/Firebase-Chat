import { useContext } from "react";

import { ChatContext } from "../../../../../context/ChatContext";
import MessageTime from "./MessageTime";
import { MessageOnWindow } from "../../../../../common/types";
import { SHOW_IMAGE } from "../../../../../common/constants";
import {
  MessageImage,
  MessageImageContainer,
  MessageSentByUserContainer,
} from "../../ChatWindow.styles";

const MessageSentByUser: React.FC<MessageOnWindow> = ({
  date,
  handleImageLoaded,
  imageUrl,
  messageText,
}): JSX.Element => {
  const [, dispatch] = useContext(ChatContext);

  const showMagnifiedImageView = (imageUrl: string) => {
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
      {messageText.length > 0 && (
        <MessageSentByUserContainer>
          {messageText}
          <MessageTime
            time={date.toDate().toLocaleTimeString()}
            moveToLeft={false}
          />
        </MessageSentByUserContainer>
      )}
    </>
  );
};

export default MessageSentByUser;
