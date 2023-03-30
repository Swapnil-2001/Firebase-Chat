import ChatWindowNavbar from "./chatWindowComponents/ChatWindowNavbar";
import MessageWindow from "./chatWindowComponents/MessageWindow";
import TypeMessageSection from "./chatWindowComponents/TypeMessageSection";
import { ChatWindowContainer } from "./ChatWindow.styles";

const ChatWindow: React.FC = (): JSX.Element => {
  return (
    <ChatWindowContainer>
      <ChatWindowNavbar />
      <MessageWindow />
      <TypeMessageSection />
    </ChatWindowContainer>
  );
};

export default ChatWindow;
