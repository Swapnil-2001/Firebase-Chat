import styled from "styled-components";

import { black, chatBoxBackgroundColor } from "../../../common/colors";

const chatBoxOuterContainerHeight = "725px";
const chatBoxNavbarHeight = "75px";
const chatBoxInnerContainerHeight = "650px"; // chatBoxOuterContainerHeight - chatBoxNavbarHeight

export const ChatBoxInnerContainer = styled.div`
  display: flex;
  height: ${chatBoxInnerContainerHeight};
`;

export const ChatBoxNavbar = styled.nav`
  height: ${chatBoxNavbarHeight};
  border-bottom: 2px solid ${black};
`;

export const ChatBoxOuterContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${chatBoxOuterContainerHeight};
  width: 85%;
  background-color: ${chatBoxBackgroundColor};
  border-radius: 35px;
`;
