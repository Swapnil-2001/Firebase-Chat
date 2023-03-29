import ChatBoxNavbar from "../chatBoxNavbar/ChatBoxNavbar";
import ChatWindow from "../chatWindow/ChatWindow";
import Sidebar from "../sidebar/Sidebar";

import { ChatBoxInnerContainer, ChatBoxOuterContainer } from "./ChatBox.styles";

const ChatBox: React.FC = (): JSX.Element => {
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
