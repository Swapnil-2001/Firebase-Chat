import { useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { Fade } from "@mui/material";

import { ChatContext } from "../../../context/ChatContext";
import ChatBoxNavbar from "../chatBoxNavbar/ChatBoxNavbar";
import ChatWindow from "../chatWindow/ChatWindow";
import Sidebar from "../sidebar/Sidebar";
import { SHOW_IMAGE } from "../../../common/constants";
import {
  ChatBoxInnerContainer,
  ChatBoxOuterContainer,
  MagnifiedImage,
  MagnifiedImageContainer,
  MagnifiedImageContainerNavbar,
} from "./ChatBox.styles";

const MagnifiedImageComponent: React.FC = (): JSX.Element => {
  const [{ magnifiedImageUrl }, dispatch] = useContext(ChatContext);

  const removeMagnifiedImage = (): void => {
    dispatch({ type: SHOW_IMAGE, payload: "" });
  };

  const shouldShowImage: boolean = magnifiedImageUrl.length > 0;

  if (!shouldShowImage) return <></>;

  return (
    <Fade in={shouldShowImage} timeout={250}>
      <MagnifiedImageContainer>
        <MagnifiedImageContainerNavbar onClick={removeMagnifiedImage}>
          <CloseOutlinedIcon />
        </MagnifiedImageContainerNavbar>
        <MagnifiedImage
          src={magnifiedImageUrl}
          alt="The user sent this as a message."
        />
      </MagnifiedImageContainer>
    </Fade>
  );
};

const ChatBox: React.FC = (): JSX.Element => {
  return (
    <ChatBoxOuterContainer>
      <MagnifiedImageComponent />
      <ChatBoxNavbar />
      <ChatBoxInnerContainer>
        <Sidebar />
        <ChatWindow />
      </ChatBoxInnerContainer>
    </ChatBoxOuterContainer>
  );
};

export default ChatBox;
