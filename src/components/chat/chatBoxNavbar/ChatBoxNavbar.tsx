import { useContext, useState } from "react";

import { UserContext } from "../../../context/UserContext";
import ChatBoxUserSection from "./ChatBoxUserSection";
import {
  ChatBoxNavbarContainer,
  ChatBoxNavbarImage,
  ChatBoxNavbarImageContainer,
} from "./ChatBoxNavbar.styles";
import defaultImage from "../../../assets/Default.png";

const ChatBoxNavbar: React.FC = (): JSX.Element => {
  const [openUserSection, setOpenUserSection] = useState<boolean>(false);

  const { currentUser } = useContext(UserContext);

  const handleOpenUserSection = (): void => {
    setOpenUserSection(true);
  };

  const handleCloseUserSection = (): void => {
    setOpenUserSection(false);
  };

  return (
    <ChatBoxNavbarContainer>
      <ChatBoxNavbarImageContainer onClick={handleOpenUserSection}>
        <ChatBoxNavbarImage
          src={currentUser?.photoURL ? currentUser.photoURL : defaultImage}
          alt="User image on navbar"
        />
      </ChatBoxNavbarImageContainer>
      <ChatBoxUserSection
        openUserSection={openUserSection}
        handleCloseUserSection={handleCloseUserSection}
      />
    </ChatBoxNavbarContainer>
  );
};

export default ChatBoxNavbar;
