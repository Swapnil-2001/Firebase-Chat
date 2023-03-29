import styled from "styled-components";
import {
  chatWindowBackgroundColor,
  gray,
  lightBlack,
  lightGray,
  white,
} from "../../../common/colors";

export const LinearProgressStyles = {
  width: "190px",
  margin: "auto 0",
};

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const SidebarConversation = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 15px;
  padding: 10px 15px;
  height: 65px;
  width: 80%;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${chatWindowBackgroundColor};
  }
`;

export const SidebarConversationImage = styled.img`
  height: 50px;
  width: 50px;
  border-radius: 50%;
`;

export const SidebarConversationInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: 15px;
`;

export const SidebarConversationUserName = styled.span`
  margin-bottom: 4px;
  color: ${white};
  font-size: 0.9rem;
  font-weight: 500;
`;

export const SidebarConversationLastMessage = styled.span`
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

export const SidebarSearchInput = styled.input`
  margin: 30px 0;
  padding: 15px;
  width: 75%;
  color: ${lightGray};
  background-color: ${lightBlack};
  border-radius: 15px;
`;

export const SidebarSearchResult = styled.div`
  display: flex;
  align-items: center;
  margin: 0 auto;
  margin-bottom: 15px;
  padding: 10px 15px;
  width: 75%;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${chatWindowBackgroundColor};
  }
`;

export const SidebarSearchResultImage = styled.img`
  height: 50px;
  width: 50px;
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
  color: ${lightGray};
  font-size: 0.85rem;
  font-weight: 600;
`;
