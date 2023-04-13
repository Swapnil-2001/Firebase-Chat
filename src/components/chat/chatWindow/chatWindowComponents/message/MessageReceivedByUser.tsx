import { useContext } from "react";

import { ChatContext } from "../../../../../context/ChatContext";
import MessageTime from "./MessageTime";
import { MessageOnWindow } from "../../../../../common/types";
import { SHOW_IMAGE } from "../../../../../common/constants";
import {
  MessageImage,
  MessageImageContainer,
  MessageReceivedByUserContainer,
} from "../../ChatWindow.styles";

const MessageReceivedByUser: React.FC<MessageOnWindow> = ({
  date,
  handleImageLoaded,
  imageUrl,
  messageText,
}): JSX.Element => {
  const [, dispatch] = useContext(ChatContext);

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
      <MessageReceivedByUserContainer>
        {messageText}
        <MessageTime
          time={date.toDate().toLocaleTimeString()}
          moveToLeft={true}
        />
      </MessageReceivedByUserContainer>
    </>
  );
};

export default MessageReceivedByUser;
