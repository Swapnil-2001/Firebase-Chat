import styled from "styled-components";

import {
  chatBoxBackgroundColor,
  lightBlack,
  lightGray,
} from "../../../common/colors";

interface SettingsModalCurrentThemeProps {
  currentTheme: string;
}

export const SettingsModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  padding: 50px;
  min-height: 70%;
  min-width: 50%;
  background-color: ${chatBoxBackgroundColor};
  border-radius: 10px;
  outline: none;
`;

export const SettingsModalCurrentTheme = styled.div<SettingsModalCurrentThemeProps>`
  margin-left: 10px;
  height: 25px;
  width: 25px;
  background-color: ${({ currentTheme }) => currentTheme};
  border-radius: 5px;
`;

export const SettingsModalCurrentThemeContainer = styled.div`
  display: flex;
  margin-left: 30px;
  padding: 15px 20px;
  color: ${lightGray};
  font-weight: 600;
  background-color: ${lightBlack};
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
`;

export const SettingsModalText = styled.div`
  margin-bottom: 35px;
  text-align: center;
  color: ${lightGray};
  font-weight: 600;
`;
