import { useState } from "react";
import { signOut } from "firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Fade } from "@mui/material";

import ChatWindow from "../chatWindow/ChatWindow";
import Sidebar from "../sidebar/Sidebar";
import { auth } from "../../../firebase";
import {
  ArrowBackIconStyles,
  ChatBoxInnerContainer,
  ChatBoxNavbar,
  ChatBoxNavbarImage,
  ChatBoxNavbarImageContainer,
  ChatBoxOuterContainer,
  ChatBoxUserSection,
  ChatBoxUserSectionImage,
  ChatBoxUserSectionImageContainer,
  ChatBoxUserSectionLogoutButton,
  ChatBoxUserSectionLogoutButtonContainer,
  ChatBoxUserSectionNavbar,
  ChatBoxUserSectionNavbarText,
} from "./ChatBox.styles";
import Jerry from "../../../assets/Jerry.jpg";

const ChatBox = () => {
  const [openUserSection, setOpenUserSection] = useState<boolean>(false);

  const handleOpenUserSection = () => {
    setOpenUserSection(true);
  };

  const handleCloseUserSection = () => {
    setOpenUserSection(false);
  };

  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <ChatBoxOuterContainer>
      <ChatBoxNavbar>
        <ChatBoxNavbarImageContainer onClick={handleOpenUserSection}>
          <ChatBoxNavbarImage src={Jerry} />
        </ChatBoxNavbarImageContainer>
        <Fade in={openUserSection} timeout={350}>
          <ChatBoxUserSection>
            <ChatBoxUserSectionNavbar>
              <ArrowBackIcon
                color="inherit"
                fontSize="medium"
                onClick={handleCloseUserSection}
                sx={ArrowBackIconStyles}
              />
              <ChatBoxUserSectionNavbarText>
                Profile
              </ChatBoxUserSectionNavbarText>
            </ChatBoxUserSectionNavbar>
            <ChatBoxUserSectionImageContainer>
              <ChatBoxUserSectionImage src={Jerry} />
            </ChatBoxUserSectionImageContainer>
            <ChatBoxUserSectionLogoutButtonContainer>
              <ChatBoxUserSectionLogoutButton onClick={handleLogout}>
                Logout
              </ChatBoxUserSectionLogoutButton>
            </ChatBoxUserSectionLogoutButtonContainer>
          </ChatBoxUserSection>
        </Fade>
      </ChatBoxNavbar>
      <ChatBoxInnerContainer>
        <Sidebar />
        <ChatWindow />
      </ChatBoxInnerContainer>
    </ChatBoxOuterContainer>
  );
};

export default ChatBox;
