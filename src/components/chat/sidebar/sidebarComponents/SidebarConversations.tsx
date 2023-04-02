import { useContext } from "react";
import { v4 as uuid } from "uuid";

import { ChatContext } from "../../../../context/ChatContext";
import { UserConversation } from "../Sidebar";
import { MessageRecipient } from "../../../../common/types";
import {
  SidebarConversation,
  SidebarConversationImage,
  SidebarConversationInfoContainer,
  SidebarConversationLastMessage,
  SidebarConversationsContainer,
  SidebarConversationUserName,
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

  const handleSelectAnUser = (userInfo: MessageRecipient) => {
    selectAnUser(userInfo);
  };

  return (
    <SidebarConversationsContainer>
      {userConversations.map(({ userInfo, lastMessage }) => (
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
              {lastMessage.messageText.substring(0, 25)}
              {lastMessage.messageText.length > 25 && "..."}
            </SidebarConversationLastMessage>
          </SidebarConversationInfoContainer>
        </SidebarConversation>
      ))}
    </SidebarConversationsContainer>
  );
};

export default SidebarConversations;
