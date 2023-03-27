import ChatWindow from "../chatWindow/ChatWindow";
import Sidebar from "../sidebar/Sidebar";
import {
  ChatBoxInnerContainer,
  ChatBoxNavbar,
  ChatBoxOuterContainer,
} from "./ChatBox.styles";

const ChatBox = () => {
  return (
    <ChatBoxOuterContainer>
      <ChatBoxNavbar />
      <ChatBoxInnerContainer>
        <Sidebar />
        <ChatWindow />
      </ChatBoxInnerContainer>
    </ChatBoxOuterContainer>
  );
};

export default ChatBox;
