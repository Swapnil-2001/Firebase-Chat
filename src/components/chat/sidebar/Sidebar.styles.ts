import styled from "styled-components";
import { lightBlack, lightGray } from "../../../common/colors";

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
`;

export const SidebarSearchInput = styled.input`
  margin: 30px 0;
  padding: 15px;
  width: 70%;
  color: ${lightGray};
  background-color: ${lightBlack};
  border-radius: 15px;
`;
