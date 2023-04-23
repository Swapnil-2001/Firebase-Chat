import { useContext } from "react";
import Modal from "@mui/material/Modal";
import { Fade } from "@mui/material";

import { AppContext } from "../../../context/AppContext";
import { OPEN_USER_MODAL } from "../../../common/constants";

const SettingsModal: React.FC = (): JSX.Element => {
  const [{ openUserModal }, dispatch] = useContext(AppContext);

  const handleCloseModal = (): void => {
    dispatch({ type: OPEN_USER_MODAL, payload: false });
  };

  return (
    <Modal open={openUserModal} onClose={handleCloseModal} closeAfterTransition>
      <Fade in={openUserModal}>
        <div></div>
      </Fade>
    </Modal>
  );
};

export default SettingsModal;
