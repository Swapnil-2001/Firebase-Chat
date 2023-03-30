import { useContext } from "react";
import { signOut } from "firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Fade } from "@mui/material";

import { auth } from "../../../firebase";
import { UserContext } from "../../../context/UserContext";
import {
  ArrowBackIconStyles,
  ChatBoxUserSectionContainer,
  ChatBoxUserSectionImage,
  ChatBoxUserSectionImageContainer,
  ChatBoxUserSectionLogoutButton,
  ChatBoxUserSectionLogoutButtonContainer,
  ChatBoxUserSectionNameContainer,
  ChatBoxUserSectionNavbar,
  ChatBoxUserSectionNavbarText,
} from "./ChatBoxNavbar.styles";
import defaultImage from "../../../assets/Default.png";

interface ChatBoxUserSectionProps {
  openUserSection: boolean;
  handleCloseUserSection: () => void;
}

const ChatBoxUserSection: React.FC<ChatBoxUserSectionProps> = ({
  openUserSection,
  handleCloseUserSection,
}): JSX.Element => {
  const { currentUser } = useContext(UserContext);

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
          <ChatBoxUserSectionImage
            src={currentUser?.photoURL ? currentUser.photoURL : defaultImage}
            alt="User Image"
          />
        </ChatBoxUserSectionImageContainer>
        <ChatBoxUserSectionNameContainer>
          {currentUser?.displayName}
        </ChatBoxUserSectionNameContainer>
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