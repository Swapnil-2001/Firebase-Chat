import { useState } from "react";

import ChatBoxUserSection from "./ChatBoxUserSection";
import {
  ChatBoxNavbarContainer,
  ChatBoxNavbarImage,
  ChatBoxNavbarImageContainer,
} from "./ChatBoxNavbar.styles";
import Jerry from "../../../assets/Jerry.jpg";

const ChatBoxNavbar = () => {
  const [openUserSection, setOpenUserSection] = useState<boolean>(false);

  const handleOpenUserSection = () => {
    setOpenUserSection(true);
  };

  const handleCloseUserSection = () => {
    setOpenUserSection(false);
  };

  return (
    <ChatBoxNavbarContainer>
      <ChatBoxNavbarImageContainer onClick={handleOpenUserSection}>
        <ChatBoxNavbarImage src={Jerry} />
      </ChatBoxNavbarImageContainer>
      <ChatBoxUserSection
        openUserSection={openUserSection}
        handleCloseUserSection={handleCloseUserSection}
      />
    </ChatBoxNavbarContainer>
  );
};

export default ChatBoxNavbar;
