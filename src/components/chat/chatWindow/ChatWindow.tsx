import { useContext, useState } from "react";

import ChatWindowNavbar from "./chatWindowComponents/ChatWindowNavbar";
import MessageWindow from "./chatWindowComponents/MessageWindow";
import TypeMessageSection from "./chatWindowComponents/TypeMessageSection";
import { ChatContext } from "../../../context/ChatContext";
import { ChatWindowContainer, HideMessageWindow } from "./ChatWindow.styles";

const ChatWindow: React.FC = (): JSX.Element => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [{ hideMessageWindow }] = useContext(ChatContext);

  return (
    <ChatWindowContainer>
      {hideMessageWindow && <HideMessageWindow />}
      <ChatWindowNavbar />
      <MessageWindow setOpenEmojiPicker={setOpenEmojiPicker} />
      <TypeMessageSection
        openEmojiPicker={openEmojiPicker}
        setOpenEmojiPicker={setOpenEmojiPicker}
      />
    </ChatWindowContainer>
  );
};

export default ChatWindow;
