import styled from "styled-components";

import {
  appBackgroundColor,
  deepBlue,
  lightBlue,
  white,
} from "../../common/colors";

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export const AuthFormAvatarUploadLabel = styled.label`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  padding: 10px 20px;
  border: 1px solid ${lightBlue};
  border-radius: 5px;
  transition: background-color 0.3s;

  &:hover {
    background-color: ${appBackgroundColor};
    cursor: pointer;
  }
`;

export const AuthFormAvatarUploadText = styled.span`
  margin-left: 15px;
  font-weight: 500;
`;

export const AuthFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 50px 0;
  width: 450px;
  background-color: ${white};
`;

export const AuthFormFooter = styled.div`
  margin-top: 25px;
  font-size: 0.9rem;
`;

export const AuthFormHeader = styled.h2`
  color: ${deepBlue};
  font-size: 1.8rem;
`;

export const AuthFormInputStyles = {
  marginTop: "25px",
  width: "300px",
};

export const AuthFormRedirectLinkStyles = {
  color: `${lightBlue}`,
  fontWeight: "500",
  textDecoration: "underline",
};

export const AuthFormSubmitButton = styled.button`
  margin-top: 20px;
  padding: 10px 0;
  color: ${white};
  font-size: 1.1rem;
  font-weight: 600;
  background-color: ${deepBlue};
  transition: background-color 0.3s;

  :hover {
    background-color: ${lightBlue};
  }
`;
