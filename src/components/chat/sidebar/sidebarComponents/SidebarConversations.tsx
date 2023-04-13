import { useContext } from "react";
import { v4 as uuid } from "uuid";

import { ChatContext } from "../../../../context/ChatContext";
import { UserConversation } from "../Sidebar";
import { MessageRecipient } from "../../../../common/types";
import {
  NoConversationsMessage,
  SidebarConversation,
  SidebarConversationImage,
  SidebarConversationInfoContainer,
  SidebarConversationLastMessage,
  SidebarConversationsContainer,
  SidebarConversationUserName,
  SidebarUnreadNotification,
} from "../Sidebar.styles";

interface SidebarConversationsProps {
  selectAnUser: (userToBeSelected: MessageRecipient) => void;
  userConversations: UserConversation[];
}

const SidebarConversations: React.FC<SidebarConversationsProps> = ({
  selectAnUser,
  userConversations,
}): JSX.Element => {
  const [{ messageRecipient }] = useContext(ChatContext);

  const handleSelectAnUser = (userInfo: MessageRecipient): void => {
    selectAnUser(userInfo);
  };

  return (
    <SidebarConversationsContainer>
      {userConversations.length === 0 && (
        <NoConversationsMessage>
          Find an user and start a conversation.
        </NoConversationsMessage>
      )}
      {userConversations.map(({ userInfo, lastMessage, isRead }) => (
        <SidebarConversation
          key={uuid()}
          onClick={() => handleSelectAnUser(userInfo)}
          isSelected={userInfo.uid === messageRecipient?.uid}
        >
          <SidebarConversationImage src={userInfo.photoURL} alt="User Image" />
          <SidebarConversationInfoContainer>
            <SidebarConversationUserName>
              {userInfo.displayName}
            </SidebarConversationUserName>
            <SidebarConversationLastMessage>
              {lastMessage.messageText.substring(0, 20)}
              {lastMessage.messageText.length > 20 && "..."}
            </SidebarConversationLastMessage>
          </SidebarConversationInfoContainer>
          {!isRead && <SidebarUnreadNotification />}
        </SidebarConversation>
      ))}
    </SidebarConversationsContainer>
  );
};

export default SidebarConversations;
