import { useContext } from "react";

import { AppContext } from "../../../../context/AppContext";
import { ChatContext } from "../../../../context/ChatContext";
import { convertStringToNameFormat } from "../../../../common/utils";
import { OPEN_USER_MODAL } from "../../../../common/constants";
import {
  ChatWindowNavbarContainer,
  ChatWindowNavbarImage,
  ChatWindowNavbarText,
  ChatWindowNavbarUserName,
} from "../ChatWindow.styles";
import defaultImage from "../../../../assets/Default.png";

const ChatWindowNavbar: React.FC = (): JSX.Element => {
  const [{ messageRecipient }] = useContext(ChatContext);
  const [, dispatch] = useContext(AppContext);

  const openUserModal = () => {
    if (messageRecipient) dispatch({ type: OPEN_USER_MODAL, payload: true });
  };

  return (
    <ChatWindowNavbarContainer onClick={openUserModal}>
      {messageRecipient ? (
        <>
          <ChatWindowNavbarImage
            src={
              messageRecipient.photoURL
                ? messageRecipient.photoURL
                : defaultImage
            }
          />
          <ChatWindowNavbarUserName>
            {convertStringToNameFormat(messageRecipient.displayName)}
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
