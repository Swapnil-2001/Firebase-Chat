import { Link } from "react-router-dom";
import { AddAPhoto } from "@mui/icons-material";
import { TextField } from "@mui/material";

import {
  AuthForm,
  AuthFormAvatarUploadLabel,
  AuthFormAvatarUploadText,
  AuthFormContainer,
  AuthFormFooter,
  AuthFormHeader,
  AuthFormInputStyles,
  AuthFormRedirectLinkStyles,
  AuthFormSubmitButton,
} from "./Form.styles";

const SignupForm = () => {
  return (
    <AuthFormContainer>
      <AuthFormHeader>Create an Account</AuthFormHeader>
      <AuthForm>
        <TextField label="Name" type="text" sx={AuthFormInputStyles} />
        <TextField label="Email" type="email" sx={AuthFormInputStyles} />
        <TextField
          label="Password"
          type="password"
          autoComplete="on"
          sx={AuthFormInputStyles}
        />
        <input id="avatarInput" type="file" style={{ display: "none" }} />
        <AuthFormAvatarUploadLabel htmlFor="avatarInput">
          <AddAPhoto color="primary" fontSize="large" />
          <AuthFormAvatarUploadText>Add an avatar</AuthFormAvatarUploadText>
        </AuthFormAvatarUploadLabel>
        <AuthFormSubmitButton type="submit">Sign Up</AuthFormSubmitButton>
      </AuthForm>
      <AuthFormFooter>
        Already have an account?{" "}
        <Link to="/login" style={AuthFormRedirectLinkStyles}>
          Log in!
        </Link>
      </AuthFormFooter>
    </AuthFormContainer>
  );
};

export default SignupForm;
