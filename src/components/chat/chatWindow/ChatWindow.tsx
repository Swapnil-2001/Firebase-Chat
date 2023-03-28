import SendIcon from "@mui/icons-material/Send";

import {
  ChatWindowContainer,
  ChatWindowNavbar,
  ChatWindowNavbarImage,
  ChatWindowNavbarText,
  ChatWindowNavbarUserName,
  MessageReceivedByUser,
  MessageSentByUser,
  MessageWindow,
  SendMessageIconWrapper,
  TypeMessageInputBox,
  TypeMessageSection,
} from "./ChatWindow.styles";
import Jerry from "../../../assets/Jerry.jpg";
import { white } from "../../../common/colors";

const ChatWindow = () => {
  return (
    <ChatWindowContainer>
      <ChatWindowNavbar>
        <ChatWindowNavbarImage src={Jerry} />
        <ChatWindowNavbarText>
          Conversation with {""}
          <ChatWindowNavbarUserName>Phil Dunphy</ChatWindowNavbarUserName>
        </ChatWindowNavbarText>
      </ChatWindowNavbar>
      <MessageWindow>
        <MessageSentByUser>Congratulations!</MessageSentByUser>
        <MessageReceivedByUser>Thank you! Feels good.</MessageReceivedByUser>
      </MessageWindow>
      <TypeMessageSection>
        <TypeMessageInputBox placeholder="Type a message..." />
        <SendMessageIconWrapper>
          <SendIcon sx={{ color: white }} />
        </SendMessageIconWrapper>
      </TypeMessageSection>
    </ChatWindowContainer>
  );
};

export default ChatWindow;
