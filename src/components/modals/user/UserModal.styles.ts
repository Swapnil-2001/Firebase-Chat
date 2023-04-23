import styled from "styled-components";

import {
  chatBoxBackgroundColor,
  lightGray,
  white,
} from "../../../common/colors";

export const CloseModalIconContainer = styled.div`
  text-align: right;
  width: 100%;
`;

export const CloseModalIconStyles = {
  color: lightGray,

  "&:hover": {
    color: white,
    cursor: "pointer",
  },
};

export const UserModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  height: 50%;
  width: 25%;
  background-color: ${chatBoxBackgroundColor};
  border-radius: 20px;
  outline: none;
`;

export const UserModalImage = styled.img`
  height: 200px;
  width: 200px;
  border-radius: 50%;
  object-fit: cover;
`;

export const UserModalText = styled.h3`
  margin-top: 40px;
  color: ${lightGray};
`;
