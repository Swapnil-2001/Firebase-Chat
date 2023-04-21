import { useContext, useState } from "react";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";

import { AppContext } from "../../../context/AppContext";
import { UserContext } from "../../../context/UserContext";
import ChatBoxUserSection from "./ChatBoxUserSection";
import {
  ChatBoxNavbarContainer,
  ChatBoxNavbarImage,
  ChatBoxNavbarImageContainer,
  ChatBoxNavbarSettingsButton,
  ChatBoxNavbarSettingsText,
} from "./ChatBoxNavbar.styles";
import defaultImage from "../../../assets/Default.png";
import { OPEN_SETTINGS_MODAL } from "../../../common/constants";

const ChatBoxNavbar: React.FC = (): JSX.Element => {
  const [openUserSection, setOpenUserSection] = useState<boolean>(false);

  const [{ openSettingsModal }, dispatch] = useContext(AppContext);
  const [{ currentUser }] = useContext(UserContext);

  const handleCloseUserSection = (): void => {
    setOpenUserSection(false);
  };

  const handleOpenSettingsModal = (): void => {
    dispatch({ type: OPEN_SETTINGS_MODAL, payload: true });
  };

  const handleOpenUserSection = (): void => {
    setOpenUserSection(true);
  };

  return (
    <ChatBoxNavbarContainer>
      <ChatBoxNavbarImageContainer onClick={handleOpenUserSection}>
        <ChatBoxNavbarImage
          src={currentUser?.photoURL ? currentUser.photoURL : defaultImage}
          alt="User image on navbar"
        />
      </ChatBoxNavbarImageContainer>
      <ChatBoxNavbarSettingsButton
        onClick={handleOpenSettingsModal}
        openSettingsModal={openSettingsModal}
      >
        <SettingsOutlinedIcon fontSize="medium" />
        <ChatBoxNavbarSettingsText>Settings</ChatBoxNavbarSettingsText>
      </ChatBoxNavbarSettingsButton>
      <ChatBoxUserSection
        openUserSection={openUserSection}
        handleCloseUserSection={handleCloseUserSection}
      />
    </ChatBoxNavbarContainer>
  );
};

export default ChatBoxNavbar;
