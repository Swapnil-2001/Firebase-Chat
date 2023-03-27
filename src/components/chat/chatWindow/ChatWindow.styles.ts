import styled from "styled-components";
import {
  black,
  chatWindowBackgroundColor,
  lightBlack,
  lightGray,
  messageByUserBackgroundColor,
  white,
} from "../../../common/colors";

const chatWindowNavbarHeight = "50px";
const chatWindowContainerMarginTop = "30px";
const typeMessageSectionHeight = "85px";
const messageWindowHeight = "485px"; // 650 - chatWindowNavbarHeight - chatWindowContainerMarginTop - typeMessageBoxHeight

export const ChatWindowContainer = styled.div`
  flex: 3;
  margin-top: ${chatWindowContainerMarginTop};
  background-color: ${chatWindowBackgroundColor};
  border-top-left-radius: 20px;
  border-bottom-right-radius: 35px;
`;

export const ChatWindowNavbar = styled.div`
  display: flex;
  align-items: center;
  height: ${chatWindowNavbarHeight};
  background-color: ${black};
  border-top-left-radius: 20px;
`;

export const ChatWindowNavbarImage = styled.img`
  margin-left: 20px;
  height: 25px;
  width: 25px;
  border-radius: 50%;
`;

export const ChatWindowNavbarUserName = styled.span`
  color: #eaeaea;
  font-weight: 600;
`;

export const ChatWindowNavbarText = styled.div`
  margin-left: 10px;
  color: ${lightGray};
  font-size: 0.8rem;
`;

export const MessageReceivedByUser = styled.div`
  margin-top: 14px;
  margin-left: 25px;
  padding: 15px 20px;
  max-width: 35%;
  color: ${white};
  font-size: 0.8rem;
  line-height: 1.8;
  background-color: ${lightBlack};
  border-radius: 20px;
  border-top-left-radius: 0;
`;

export const MessageSentByUser = styled.div`
  margin: 14px 25px 0 auto;
  padding: 15px 20px;
  max-width: 35%;
  color: ${white};
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.8;
  background-color: ${messageByUserBackgroundColor};
  border-radius: 20px;
  border-bottom-right-radius: 0;
`;

export const MessageWindow = styled.div`
  display: flex;
  flex-direction: column;
  height: ${messageWindowHeight};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SendMessageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20px;
  padding: 7px 10px;
  background-color: ${messageByUserBackgroundColor};
  border-radius: 10px;
`;

export const TypeMessageInputBox = styled.input`
  padding: 15px;
  width: 90%;
  color: ${white};
  background-color: ${black};
  border-radius: 15px;
`;

export const TypeMessageSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  height: ${typeMessageSectionHeight};
`;
