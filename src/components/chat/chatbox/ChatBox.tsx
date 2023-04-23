import ChatBoxNavbar from "../chatBoxNavbar/ChatBoxNavbar";
import ChatWindow from "../chatWindow/ChatWindow";
import MagnifiedImage from "./MagnifiedImage";
import SettingsModal from "../../modals/settings/SettingsModal";
import Sidebar from "../sidebar/Sidebar";
import { ChatBoxInnerContainer, ChatBoxOuterContainer } from "./ChatBox.styles";

const ChatBox: React.FC = (): JSX.Element => {
  return (
    <>
      <SettingsModal />
      <MagnifiedImage />
      <ChatBoxOuterContainer>
        <ChatBoxNavbar />
        <ChatBoxInnerContainer>
          <Sidebar />
          <ChatWindow />
        </ChatBoxInnerContainer>
      </ChatBoxOuterContainer>
    </>
  );
};

export default ChatBox;
