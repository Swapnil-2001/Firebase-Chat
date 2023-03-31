import { useContext } from "react";

import ChatWindowNavbar from "./chatWindowComponents/ChatWindowNavbar";
import MessageWindow from "./chatWindowComponents/MessageWindow";
import TypeMessageSection from "./chatWindowComponents/TypeMessageSection";
import { ChatContext } from "../../../context/ChatContext";
import { ChatWindowContainer, HideMessageWindow } from "./ChatWindow.styles";

const ChatWindow: React.FC = (): JSX.Element => {
  const [{ hideMessageWindow }] = useContext(ChatContext);

  return (
    <ChatWindowContainer>
      {hideMessageWindow && <HideMessageWindow />}
      <ChatWindowNavbar />
      <MessageWindow />
      <TypeMessageSection />
    </ChatWindowContainer>
  );
};

export default ChatWindow;
