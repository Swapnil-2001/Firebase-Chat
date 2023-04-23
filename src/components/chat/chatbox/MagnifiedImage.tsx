import { useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Fade } from "@mui/material";

import { ChatContext } from "../../../context/ChatContext";
import { downloadImage } from "../../../common/utils";
import { SHOW_IMAGE } from "../../../common/constants";
import {
  MagnifiedImage,
  MagnifiedImageContainer,
  MagnifiedImageContainerNavbar,
  MagnifiedImageContainerNavbarIcon,
} from "./ChatBox.styles";

const MagnifiedImageComponent: React.FC = (): JSX.Element => {
  const [{ magnifiedImageUrl }, dispatch] = useContext(ChatContext);

  const removeMagnifiedImage = (): void => {
    dispatch({ type: SHOW_IMAGE, payload: "" });
  };

  const shouldShowImage: boolean = magnifiedImageUrl.length > 0;

  if (!shouldShowImage) return <></>;

  return (
    <Fade in={shouldShowImage} timeout={250}>
      <MagnifiedImageContainer>
        <MagnifiedImageContainerNavbar>
          <MagnifiedImageContainerNavbarIcon
            onClick={() => downloadImage(magnifiedImageUrl)}
          >
            <FileDownloadOutlinedIcon />
          </MagnifiedImageContainerNavbarIcon>
          <MagnifiedImageContainerNavbarIcon onClick={removeMagnifiedImage}>
            <CloseOutlinedIcon />
          </MagnifiedImageContainerNavbarIcon>
        </MagnifiedImageContainerNavbar>
        <MagnifiedImage
          src={magnifiedImageUrl}
          alt="The user sent this as a message."
        />
      </MagnifiedImageContainer>
    </Fade>
  );
};

export default MagnifiedImageComponent;
