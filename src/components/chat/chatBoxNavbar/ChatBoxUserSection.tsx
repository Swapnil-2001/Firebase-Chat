import { signOut } from "firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Fade } from "@mui/material";

import { auth } from "../../../firebase";
import {
  ArrowBackIconStyles,
  ChatBoxUserSectionContainer,
  ChatBoxUserSectionImage,
  ChatBoxUserSectionImageContainer,
  ChatBoxUserSectionLogoutButton,
  ChatBoxUserSectionLogoutButtonContainer,
  ChatBoxUserSectionNavbar,
  ChatBoxUserSectionNavbarText,
} from "./ChatBoxNavbar.styles";
import Jerry from "../../../assets/Jerry.jpg";

interface ChatBoxUserSectionProps {
  openUserSection: boolean;
  handleCloseUserSection: () => void;
}

const ChatBoxUserSection: React.FC<ChatBoxUserSectionProps> = ({
  openUserSection,
  handleCloseUserSection,
}) => {
  const handleLogout = () => {
    signOut(auth);
  };

  return (
    <Fade in={openUserSection} timeout={350}>
      <ChatBoxUserSectionContainer>
        <ChatBoxUserSectionNavbar>
          <ArrowBackIcon
            color="inherit"
            fontSize="medium"
            onClick={handleCloseUserSection}
            sx={ArrowBackIconStyles}
          />
          <ChatBoxUserSectionNavbarText>Profile</ChatBoxUserSectionNavbarText>
        </ChatBoxUserSectionNavbar>
        <ChatBoxUserSectionImageContainer>
          <ChatBoxUserSectionImage src={Jerry} />
        </ChatBoxUserSectionImageContainer>
        <ChatBoxUserSectionLogoutButtonContainer>
          <ChatBoxUserSectionLogoutButton onClick={handleLogout}>
            Logout
          </ChatBoxUserSectionLogoutButton>
        </ChatBoxUserSectionLogoutButtonContainer>
      </ChatBoxUserSectionContainer>
    </Fade>
  );
};

export default ChatBoxUserSection;
