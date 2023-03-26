import ChatWindow from "../chatWindow/ChatWindow";
import Sidebar from "../sidebar/Sidebar";
import { ChatBoxContainer } from "./ChatBox.styles";

const ChatBox = () => {
  return (
    <ChatBoxContainer>
      <Sidebar />
      <ChatWindow />
    </ChatBoxContainer>
  );
};

export default ChatBox;
