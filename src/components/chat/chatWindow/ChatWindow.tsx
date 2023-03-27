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
          <ChatWindowNavbarUserName>Srirupa Datta</ChatWindowNavbarUserName>
        </ChatWindowNavbarText>
      </ChatWindowNavbar>
      <MessageWindow>
        <MessageSentByUser>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </MessageSentByUser>
        <MessageReceivedByUser>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </MessageReceivedByUser>
        <MessageSentByUser>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </MessageSentByUser>
        <MessageSentByUser>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </MessageSentByUser>
        <MessageSentByUser>
          Lorem Ipsum has been the industry's standard dummy text ever since the
          1500s, when an unknown printer took a galley of type and scrambled it
          to make a type specimen book.
        </MessageSentByUser>
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
