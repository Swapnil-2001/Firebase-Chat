import { v4 as uuid } from "uuid";

import { MessageRecipient } from "../../../../common/types";
import { UserConversation } from "../Sidebar";
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
  return (
    <SidebarConversationsContainer>
      {userConversations.map(({ userInfo, lastMessage }) => (
        <SidebarConversation
          key={uuid()}
          onClick={() => selectAnUser(userInfo)}
        >
          <SidebarConversationImage src={userInfo.photoURL} alt="User Image" />
          <SidebarConversationInfoContainer>
            <SidebarConversationUserName>
              {userInfo.displayName}
            </SidebarConversationUserName>
            <SidebarConversationLastMessage>
              {lastMessage.messageText.substring(0, 25)}{" "}
              {lastMessage.messageText.length > 25 && "..."}
            </SidebarConversationLastMessage>
          </SidebarConversationInfoContainer>
        </SidebarConversation>
      ))}
    </SidebarConversationsContainer>
  );
};

export default SidebarConversations;
