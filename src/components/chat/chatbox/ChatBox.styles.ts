import styled from "styled-components";

import { black, chatBoxBackgroundColor } from "../../../common/colors";

const chatBoxOuterContainerHeight = "725px";
const chatBoxNavbarHeight = "65px";
const chatBoxInnerContainerHeight = "660px"; // chatBoxOuterContainerHeight - chatBoxNavbarHeight

export const ChatBoxInnerContainer = styled.div`
  display: flex;
  height: ${chatBoxInnerContainerHeight};
`;

export const ChatBoxNavbar = styled.nav`
  display: flex;
  align-items: center;
  height: ${chatBoxNavbarHeight};
  border-bottom: 2px solid ${black};
`;

export const ChatBoxNavbarImage = styled.img`
  margin-left: 30px;
  height: 45px;
  width: 45px;
  object-fit: cover;
  border-radius: 50%;
`;

export const ChatBoxOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${chatBoxOuterContainerHeight};
  width: 85%;
  background-color: ${chatBoxBackgroundColor};
  border-radius: 35px;
`;
