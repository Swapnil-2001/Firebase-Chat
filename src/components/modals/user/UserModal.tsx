import { useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import Modal from "@mui/material/Modal";
import { Fade } from "@mui/material";

import { AppContext } from "../../../context/AppContext";
import { ChatContext } from "../../../context/ChatContext";
import { convertStringToNameFormat } from "../../../common/utils";
import { OPEN_USER_MODAL } from "../../../common/constants";
import {
  CloseModalIconContainer,
  CloseModalIconStyles,
  UserModalContainer,
  UserModalImage,
  UserModalText,
} from "./UserModal.styles";

const SettingsModal: React.FC = (): JSX.Element => {
  const [{ openUserModal }, dispatch] = useContext(AppContext);
  const [{ messageRecipient }] = useContext(ChatContext);

  const handleCloseModal = (): void => {
    dispatch({ type: OPEN_USER_MODAL, payload: false });
  };

  if (!messageRecipient) return <></>;

  return (
    <Modal open={openUserModal} onClose={handleCloseModal} closeAfterTransition>
      <Fade in={openUserModal}>
        <UserModalContainer>
          <CloseModalIconContainer onClick={handleCloseModal}>
            <CloseOutlinedIcon sx={CloseModalIconStyles} />
          </CloseModalIconContainer>
          <UserModalImage
            src={messageRecipient.photoURL}
            alt="Message Recipient"
          />
          <UserModalText>
            {convertStringToNameFormat(messageRecipient.displayName)}
          </UserModalText>
        </UserModalContainer>
      </Fade>
    </Modal>
  );
};

export default SettingsModal;
