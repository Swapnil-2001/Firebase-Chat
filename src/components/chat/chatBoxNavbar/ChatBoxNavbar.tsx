import { useContext, useState } from "react";

import ChatBoxUserSection from "./ChatBoxUserSection";
import { UserContext } from "../../../context/UserContext";
import {
  ChatBoxNavbarContainer,
  ChatBoxNavbarImage,
  ChatBoxNavbarImageContainer,
} from "./ChatBoxNavbar.styles";
import defaultImage from "../../../assets/Default.png";

const ChatBoxNavbar: React.FC = (): JSX.Element => {
  const [openUserSection, setOpenUserSection] = useState<boolean>(false);

  const { currentUser } = useContext(UserContext);

  const handleOpenUserSection = () => {
    setOpenUserSection(true);
  };

  const handleCloseUserSection = () => {
    setOpenUserSection(false);
  };

  return (
    <ChatBoxNavbarContainer>
      <ChatBoxNavbarImageContainer onClick={handleOpenUserSection}>
        <ChatBoxNavbarImage
          src={currentUser?.photoURL ? currentUser.photoURL : defaultImage}
          alt="User Image on navbar"
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
