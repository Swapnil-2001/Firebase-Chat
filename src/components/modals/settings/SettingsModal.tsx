import { useContext } from "react";
import Modal from "@mui/material/Modal";
import { Fade } from "@mui/material";
import { ColorChangeHandler, ColorResult, TwitterPicker } from "react-color";

import { AppContext } from "../../../context/AppContext";
import {
  OPEN_SETTINGS_MODAL,
  SET_APP_THEME_COLOR,
} from "../../../common/constants";
import { lightBlack } from "../../../common/colors";
import {
  SettingsModalContainer,
  SettingsModalCurrentTheme,
  SettingsModalCurrentThemeContainer,
  SettingsModalText,
} from "./SettingsModal.styles";

const twitterStyle = {
  default: {
    input: {
      display: "none",
    },
    hash: {
      display: "none",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "70px",
      backgroundColor: lightBlack,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
  },
};

const SettingsModal: React.FC = (): JSX.Element => {
  const [{ appThemeColor, openSettingsModal }, dispatch] =
    useContext(AppContext);

  const handleCloseModal = (): void => {
    dispatch({ type: OPEN_SETTINGS_MODAL, payload: false });
  };

  const handlePickAppThemeColor: ColorChangeHandler = (color: ColorResult) => {
    dispatch({ type: SET_APP_THEME_COLOR, payload: color.hex });
  };

  return (
    <Modal
      open={openSettingsModal}
      onClose={handleCloseModal}
      closeAfterTransition
    >
      <Fade in={openSettingsModal}>
        <SettingsModalContainer>
          <SettingsModalText>Pick the chat theme</SettingsModalText>
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
            }}
          >
            <TwitterPicker
              colors={["#655DBB", "#0A4D68", "#3C486B"]}
              width="150px"
              triangle="hide"
              onChangeComplete={handlePickAppThemeColor}
              styles={twitterStyle}
            />
            <SettingsModalCurrentThemeContainer>
              Current theme{" "}
              <SettingsModalCurrentTheme currentTheme={appThemeColor} />
            </SettingsModalCurrentThemeContainer>
          </div>
        </SettingsModalContainer>
      </Fade>
    </Modal>
  );
};

export default SettingsModal;
