import { useContext, useState } from "react";
import { LinearProgress } from "@mui/material";

import { ChatContext } from "../../../context/ChatContext";
import ChatWindowNavbar from "./chatWindowComponents/ChatWindowNavbar";
import MessageWindow from "./chatWindowComponents/MessageWindow";
import TypeMessageSection from "./chatWindowComponents/TypeMessageSection";
import {
  ChatWindowContainer,
  HideMessageWindow,
  LinearProgressStyles,
} from "./ChatWindow.styles";

const ChatWindow: React.FC = (): JSX.Element => {
  const [openEmojiPicker, setOpenEmojiPicker] = useState<boolean>(false);
  const [{ hideMessageWindow }] = useContext(ChatContext);

  return (
    <ChatWindowContainer>
      {hideMessageWindow < 2 && <HideMessageWindow />}
      <ChatWindowNavbar />
      {hideMessageWindow === 1 ? (
        <LinearProgress sx={LinearProgressStyles} />
      ) : (
        <div style={{ height: "4px", backgroundColor: "transparent" }} />
      )}
      <MessageWindow setOpenEmojiPicker={setOpenEmojiPicker} />
      <TypeMessageSection
        openEmojiPicker={openEmojiPicker}
        setOpenEmojiPicker={setOpenEmojiPicker}
      />
    </ChatWindowContainer>
  );
};

export default ChatWindow;
