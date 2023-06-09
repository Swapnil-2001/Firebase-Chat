import styled from "styled-components";
import {
  chatWindowBackgroundColor,
  gray,
  green,
  lightBlack,
  lightGray,
  white,
} from "../../../common/colors";

interface SidebarConversationProps {
  isSelected: boolean;
}

export const CloseSearchSectionButton = styled.div`
  text-align: center;
  color: ${gray};
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: ${lightGray};
  }
`;

export const DoneAllOutlinedIconStyles = {
  fontSize: "15px",
  marginRight: "5px",
};

export const LinearProgressStyles = {
  margin: "auto 0",
  width: "190px",
};

export const NoConversationsMessage = styled.div`
  display: flex;
  align-items: center;
  padding: 0 22px;
  height: 100%;
  color: ${gray};
  font-size: 15px;
  font-weight: 600;
`;

export const SidebarContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SidebarConversation = styled.div<SidebarConversationProps>`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 7px;
  padding: 10px 15px;
  height: 65px;
  width: 80%;
  background-color: ${({ isSelected }) => (isSelected ? lightBlack : "")};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  box-shadow: ${({ isSelected }) =>
    isSelected
      ? "rgba(0, 0, 0, 0.07) 0px 1px 2px, rgba(0, 0, 0, 0.07) 0px 2px 4px, rgba(0, 0, 0, 0.07) 0px 4px 8px, rgba(0, 0, 0, 0.07) 0px 8px 16px, rgba(0, 0, 0, 0.07) 0px 16px 32px, rgba(0, 0, 0, 0.07) 0px 32px 64px"
      : ""};

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? lightBlack : chatWindowBackgroundColor};
  }
`;

export const SidebarConversationImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

export const SidebarConversationInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 15px;
  width: 60%;
`;

export const SidebarConversationLastMessage = styled.span`
  display: flex;
  align-items: center;
  color: ${gray};
  font-size: 0.75rem;
`;

export const SidebarConversationLastMessageIsImage = styled.div`
  display: flex;
  align-items: center;
  color: ${gray};
  font-size: 0.75rem;
`;

export const SidebarConversationsContainer = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SidebarConversationUserName = styled.span`
  margin-bottom: 4px;
  color: ${white};
  font-size: 0.9rem;
  font-weight: 500;
`;

export const SidebarSearchInput = styled.input`
  margin: 30px 0;
  padding: 15px;
  width: 75%;
  color: ${lightGray};
  background-color: ${lightBlack};
  border-radius: 15px;
`;

export const SidebarSearchResult = styled.div<SidebarConversationProps>`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 15px;
  padding: 10px 15px;
  width: 75%;
  background-color: ${({ isSelected }) => (isSelected ? lightBlack : "")};
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${({ isSelected }) =>
      isSelected ? lightBlack : chatWindowBackgroundColor};
  }
`;

export const SidebarSearchResultImage = styled.img`
  height: 50px;
  width: 50px;
  object-fit: cover;
  border-radius: 50%;
`;

export const SidebarSearchResultName = styled.p`
  margin-left: 15px;
  color: ${white};
  font-size: 15px;
  font-weight: 500;
`;

export const SidebarSearchResultsContainer = styled.div`
  height: 100%;
  width: 100%;
  text-align: center;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    display: none;
  }
`;

export const SidebarSearchResultsHelperText = styled.div`
  margin-top: 20px;
  color: ${lightGray};
  font-size: 0.85rem;
  font-weight: 600;
`;

export const SidebarUnreadNotification = styled.div`
  height: 12px;
  width: 12px;
  margin-left: 12px;
  background-color: ${green};
  border-radius: 50%;
`;
