import styled from "styled-components";

import {
  black,
  chatWindowBackgroundColor,
  lightBlack,
  lightGray,
  lightRed,
  white,
  yellow,
} from "../../../common/colors";

const chatBoxBorderRadius = "35px";

const chatBoxNavbarHeight = "75px";
const chatBoxOuterContainerHeight = "725px";

interface ChatBoxNavbarSettingsButtonProps {
  openSettingsModal: boolean;
}

interface ChatBoxUserSectionNavbarProps {
  background: string;
}

export const ArrowBackIconStyles = {
  marginLeft: "30px",
  cursor: "pointer",
};

export const ChatBoxNavbarContainer = styled.nav`
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

export const ChatBoxNavbarSettingsButton = styled.div<ChatBoxNavbarSettingsButtonProps>`
  display: flex;
  align-items: center;
  margin-left: 19%;
  color: ${({ openSettingsModal }) => (openSettingsModal ? yellow : lightGray)};
  border-top: ${({ openSettingsModal }) =>
    `3px solid ${openSettingsModal ? yellow : "transparent"}`};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${({ openSettingsModal }) => (openSettingsModal ? yellow : white)};
  }
`;

export const ChatBoxNavbarSettingsText = styled.p`
  margin-left: 10px;
  font-size: 0.85rem;
`;

export const ChatBoxUserSectionContainer = styled.div`
  position: absolute;
  top: 0;
  height: ${chatBoxOuterContainerHeight};
  width: 24%;
  background-color: ${chatWindowBackgroundColor};
  border-top-left-radius: ${chatBoxBorderRadius};
  z-index: 100;
`;

export const ChatBoxUserSectionImage = styled.img`
  height: 120px;
  width: 120px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ChatBoxUserSectionImageContainer = styled.div`
  text-align: center;
  margin: 30px 20px;
`;

export const ChatBoxUserSectionLogoutButton = styled.button`
  padding: 15px 0;
  width: 100%;
  color: ${lightRed};
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

export const ChatBoxUserSectionNameContainer = styled.div`
  text-align: center;
  color: ${lightGray};
  font-weight: 500;
`;

export const ChatBoxUserSectionNavbar = styled.div<ChatBoxUserSectionNavbarProps>`
  display: flex;
  align-items: center;
  height: ${chatBoxNavbarHeight};
  color: ${white};
  background-color: ${({ background }) => background};
  border-top-left-radius: ${chatBoxBorderRadius};
`;

export const ChatBoxUserSectionNavbarText = styled.div`
  margin-left: 30px;
  font-weight: 500;
`;
