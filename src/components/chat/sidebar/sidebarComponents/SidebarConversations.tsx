import { useContext } from "react";
import { v4 as uuid } from "uuid";
import DoneAllOutlinedIcon from "@mui/icons-material/DoneAllOutlined";
import ImageOutlinedIcon from "@mui/icons-material/ImageOutlined";

import { ChatContext } from "../../../../context/ChatContext";
import { UserContext } from "../../../../context/UserContext";
import { convertStringToNameFormat } from "../../../../common/utils";
import { MessageRecipient, UserConversation } from "../../../../common/types";
import {
  DoneAllOutlinedIconStyles,
  NoConversationsMessage,
  SidebarConversation,
  SidebarConversationImage,
  SidebarConversationInfoContainer,
  SidebarConversationLastMessage,
  SidebarConversationLastMessageIsImage,
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
  const [{ currentUser }] = useContext(UserContext);

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
              {convertStringToNameFormat(userInfo.displayName)}
            </SidebarConversationUserName>
            {lastMessage.messageText.length > 0 ? (
              <SidebarConversationLastMessage>
                {lastMessage.idOfSender === currentUser?.uid && (
                  <DoneAllOutlinedIcon sx={DoneAllOutlinedIconStyles} />
                )}
                {lastMessage.messageText.substring(0, 20)}
                {lastMessage.messageText.length > 20 && "..."}
              </SidebarConversationLastMessage>
            ) : (
              <SidebarConversationLastMessageIsImage>
                {lastMessage.idOfSender === currentUser?.uid && (
                  <DoneAllOutlinedIcon sx={DoneAllOutlinedIconStyles} />
                )}
                <ImageOutlinedIcon
                  fontSize="small"
                  sx={{ marginRight: "5px" }}
                />
                Photo
              </SidebarConversationLastMessageIsImage>
            )}
          </SidebarConversationInfoContainer>
          {!isRead && <SidebarUnreadNotification />}
        </SidebarConversation>
      ))}
    </SidebarConversationsContainer>
  );
};

export default SidebarConversations;
