import { useContext } from "react";
import Modal from "@mui/material/Modal";
import { Fade } from "@mui/material";
import { ColorChangeHandler, ColorResult, TwitterPicker } from "react-color";

import { AppContext } from "../../../context/AppContext";
import {
  COLOR_PICKER_COLORS,
  OPEN_SETTINGS_MODAL,
  SET_APP_THEME_COLOR,
  TWITTER_STYLE,
} from "../../../common/constants";
import {
  SettingsModalContainer,
  SettingsModalCurrentTheme,
  SettingsModalCurrentThemeContainer,
  SettingsModalText,
} from "./SettingsModal.styles";

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
              colors={COLOR_PICKER_COLORS}
              width="150px"
              triangle="hide"
              onChangeComplete={handlePickAppThemeColor}
              styles={TWITTER_STYLE}
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
