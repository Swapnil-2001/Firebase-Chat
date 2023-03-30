import { useContext } from "react";

import { ChatContext } from "../../../../context/ChatContext";
import {
  ChatWindowNavbarContainer,
  ChatWindowNavbarImage,
  ChatWindowNavbarText,
  ChatWindowNavbarUserName,
} from "../ChatWindow.styles";

const ChatWindowNavbar: React.FC = (): JSX.Element => {
  const [{ messageRecipient }] = useContext(ChatContext);

  return (
    <ChatWindowNavbarContainer>
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
    </ChatWindowNavbarContainer>
  );
};

export default ChatWindowNavbar;
