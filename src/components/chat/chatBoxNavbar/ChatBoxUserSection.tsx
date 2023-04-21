import { useContext, useState } from "react";
import { signOut } from "firebase/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CircularProgress from "@mui/material/CircularProgress";
import { Fade } from "@mui/material";

import { auth } from "../../../firebase";
import { AppContext } from "../../../context/AppContext";
import { ChatContext } from "../../../context/ChatContext";
import { UserContext } from "../../../context/UserContext";
import { changeProfilePicture } from "../../../common/firebaseFunctions";
import { RESET_TO_DEFAULT_VALUES } from "../../../common/constants";
import {
  ArrowBackIconStyles,
  ChatBoxUserSectionContainer,
  ChatBoxUserSectionImage,
  ChatBoxUserSectionImageContainer,
  ChatBoxUserSectionImageContainerLabel,
  ChatBoxUserSectionLogoutButton,
  ChatBoxUserSectionLogoutButtonContainer,
  ChatBoxUserSectionNameContainer,
  ChatBoxUserSectionNavbar,
  ChatBoxUserSectionNavbarText,
} from "./ChatBoxNavbar.styles";
import defaultImage from "../../../assets/Default.png";
import { white } from "../../../common/colors";

interface ChatBoxUserSectionProps {
  openUserSection: boolean;
  handleCloseUserSection: () => void;
}

const ChatBoxUserSection: React.FC<ChatBoxUserSectionProps> = ({
  openUserSection,
  handleCloseUserSection,
}): JSX.Element => {
  const [changingProfilePicture, setChangingProfilePicture] =
    useState<boolean>(false);

  const [{ appThemeColor }] = useContext(AppContext);
  const [, dispatch] = useContext(ChatContext);
  const [{ currentUser }] = useContext(UserContext);

  const handleChangeProfilePicture = async (
    event: React.FormEvent<HTMLInputElement>
  ) => {
    const { files } = event.currentTarget;
    if (files && currentUser) {
      setChangingProfilePicture(true);
      await changeProfilePicture(files[0], currentUser);
      setChangingProfilePicture(false);
    }
  };

  const handleLogout = (): void => {
    dispatch({ type: RESET_TO_DEFAULT_VALUES });
    signOut(auth);
  };

  return (
    <Fade in={openUserSection} timeout={350}>
      <ChatBoxUserSectionContainer>
        <ChatBoxUserSectionNavbar background={appThemeColor}>
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
          <input
            id="userProfileImageEdit"
            name="image"
            type="file"
            accept=".png,.jpeg,.jpg"
            onChange={handleChangeProfilePicture}
            style={{ display: "none" }}
          />
          <ChatBoxUserSectionImageContainerLabel htmlFor="userProfileImageEdit">
            {changingProfilePicture ? (
              <CircularProgress size={10} sx={{ color: white }} />
            ) : (
              "Edit"
            )}
          </ChatBoxUserSectionImageContainerLabel>
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
