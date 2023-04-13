import styled from "styled-components";

import {
  black,
  chatBoxBackgroundColor,
  chatWindowBackgroundColor,
  darkRed,
  lightBlack,
  messageByUserBackgroundColor,
  white,
} from "../../../common/colors";

const chatBoxBorderRadius = "35px";

const chatBoxNavbarHeight = "75px";
const chatBoxOuterContainerHeight = "725px";
const chatBoxInnerContainerHeight = "650px"; // chatBoxOuterContainerHeight - chatBoxNavbarHeight

export const ArrowBackIconStyles = {
  marginLeft: "30px",
  cursor: "pointer",
};

export const ChatBoxInnerContainer = styled.div`
  display: flex;
  height: ${chatBoxInnerContainerHeight};
`;

export const ChatBoxNavbar = styled.nav`
  position: relative;
  display: flex;
  height: ${chatBoxNavbarHeight};
  border-bottom: 2px solid ${black};
`;

export const ChatBoxNavbarImage = styled.img`
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 50%;
  cursor: pointer;
`;

export const ChatBoxNavbarImageContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 30px;
`;

export const ChatBoxOuterContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: ${chatBoxOuterContainerHeight};
  width: 90%;
  background-color: ${chatBoxBackgroundColor};
  border-radius: ${chatBoxBorderRadius};
`;

export const ChatBoxUserSection = styled.div`
  position: absolute;
  top: 0;
  height: ${chatBoxOuterContainerHeight};
  width: 24%;
  background-color: ${chatWindowBackgroundColor};
  border-top-left-radius: ${chatBoxBorderRadius};
`;

export const ChatBoxUserSectionImage = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ChatBoxUserSectionImageContainer = styled.div`
  margin: 30px 20px;
  text-align: center;
`;

export const ChatBoxUserSectionLogoutButton = styled.button`
  padding: 15px 0;
  width: 100%;
  color: ${darkRed};
  background-color: ${lightBlack};
  border-radius: 10px;
`;

export const ChatBoxUserSectionLogoutButtonContainer = styled.div`
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  width: 85%;
  transition: width 0.3s;

  &:hover {
    width: 90%;
  }
`;

export const ChatBoxUserSectionNavbar = styled.div`
  display: flex;
  align-items: center;
  height: ${chatBoxNavbarHeight};
  color: ${white};
  background-color: ${messageByUserBackgroundColor};
  border-top-left-radius: ${chatBoxBorderRadius};
`;

export const ChatBoxUserSectionNavbarText = styled.div`
  margin-left: 30px;
  font-weight: 500;
`;

export const MagnifiedImage = styled.img`
  max-height: 90%;
  max-width: 95%;
  object-fit: contain;
`;

export const MagnifiedImageContainer = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
  background-color: ${chatWindowBackgroundColor};
  border-radius: ${chatBoxBorderRadius};
  z-index: 100;
`;

export const MagnifiedImageContainerNavbar = styled.div`
  padding: 10px 0;
  height: 30px;
  width: max-content;
  color: ${white};
  cursor: pointer;
`;
