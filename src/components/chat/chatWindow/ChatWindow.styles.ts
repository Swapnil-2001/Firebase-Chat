import styled from "styled-components";
import {
  black,
  chatBoxBackgroundColor,
  chatWindowBackgroundColor,
  gray,
  lightBlack,
  lightGray,
  messageByUserBackgroundColor,
  white,
} from "../../../common/colors";

const chatWindowNavbarHeight = "50px";
const chatWindowContainerMarginTop = "30px";
const typeMessageSectionHeight = "85px";
const messageWindowHeight = "485px"; // 650 - chatWindowNavbarHeight - chatWindowContainerMarginTop - typeMessageBoxHeight

interface ConversationDateContainerProps {
  showDate: boolean;
}

interface MessageTimeContainerProps {
  moveToLeft: boolean;
}

export const ConversationDateContainer = styled.div<ConversationDateContainerProps>`
  display: ${({ showDate }) => (showDate ? "flex" : "none")};
  text-align: center;
  margin: 15px auto;
  padding: 5px 10px;
  width: max-content;
  color: ${gray};
  font-size: 0.8rem;
  background-color: ${chatBoxBackgroundColor};
  border-radius: 10px;
`;

export const ChatWindowContainer = styled.div`
  position: relative;
  flex: 3;
  margin-top: ${chatWindowContainerMarginTop};
  background-color: ${chatWindowBackgroundColor};
  border-top-left-radius: 20px;
  border-bottom-right-radius: 35px;
`;

export const ChatWindowNavbarContainer = styled.div`
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
  object-fit: cover;
  border-radius: 50%;
`;

export const ChatWindowNavbarUserName = styled.span`
  margin-left: 15px;
  color: #eaeaea;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const ChatWindowNavbarText = styled.div`
  margin-left: 20px;
  color: ${lightGray};
  font-size: 0.8rem;
`;

export const HideMessageWindow = styled.div`
  position: absolute;
  top: ${chatWindowNavbarHeight};
  right: 0;
  height: ${messageWindowHeight};
  width: 100%;
  background-color: ${chatWindowBackgroundColor};
`;

export const EmojiPickerContainer = styled.div`
  position: absolute;
  bottom: 85px;
  right: 0;
`;

export const MessageReceivedByUser = styled.div`
  margin-top: 5px;
  margin-left: 25px;
  padding: 15px 20px;
  padding-bottom: 5px;
  width: max-content;
  max-width: 35%;
  color: ${white};
  font-size: 0.8rem;
  line-height: 1.8;
  background-color: ${lightBlack};
  border-radius: 20px;
  border-top-left-radius: 0;
`;

export const MessageSentByUser = styled.div`
  margin: 5px 25px 0 auto;
  padding: 15px 20px;
  padding-bottom: 5px;
  width: max-content;
  max-width: 35%;
  color: ${white};
  font-size: 0.8rem;
  font-weight: 500;
  line-height: 1.8;
  background-color: ${messageByUserBackgroundColor};
  border-radius: 20px;
  border-bottom-right-radius: 0;
`;

export const MessageSendTimeContainer = styled.div<MessageTimeContainerProps>`
  margin-top: 3px;
  margin-left: ${({ moveToLeft }) => (moveToLeft ? "0" : "auto")};
  width: max-content;
  color: ${lightGray};
  font-size: 0.65rem;
`;

export const MessageWindowContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: ${messageWindowHeight};
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SelectEmojiIconStyles = {
  color: gray,
  fontSize: "30px",

  "&:hover": {
    color: lightGray,
    cursor: "pointer",
  },
};

export const SelectEmojiIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 18px;
`;

export const SendMessageIconWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-left: 18px;
  padding: 7px 10px;
  background-color: ${messageByUserBackgroundColor};
  border-radius: 10px;
  cursor: pointer;
`;

export const TypeMessageInputBox = styled.input`
  padding: 15px;
  width: 90%;
  color: ${white};
  background-color: ${lightBlack};
  border-radius: 15px;
`;

export const TypeMessageSectionContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;
  height: ${typeMessageSectionHeight};
`;
