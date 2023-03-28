import ChatWindow from "../chatWindow/ChatWindow";
import Sidebar from "../sidebar/Sidebar";
import {
  ChatBoxInnerContainer,
  ChatBoxNavbar,
  ChatBoxNavbarImage,
  ChatBoxOuterContainer,
} from "./ChatBox.styles";
import Jerry from "../../../assets/Jerry.jpg";

const ChatBox = () => {
  return (
    <ChatBoxOuterContainer>
      <ChatBoxNavbar>
        <ChatBoxNavbarImage src={Jerry} />
      </ChatBoxNavbar>
      <ChatBoxInnerContainer>
        <Sidebar />
        <ChatWindow />
      </ChatBoxInnerContainer>
    </ChatBoxOuterContainer>
  );
};

export default ChatBox;
