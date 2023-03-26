import { Link } from "react-router-dom";
import { TextField } from "@mui/material";

import {
  AuthForm,
  AuthFormContainer,
  AuthFormFooter,
  AuthFormHeader,
  AuthFormInputStyles,
  AuthFormRedirectLinkStyles,
  AuthFormSubmitButton,
} from "./Form.styles";

const LoginForm = () => {
  return (
    <AuthFormContainer>
      <AuthFormHeader>Welcome Back</AuthFormHeader>
      <AuthForm>
        <TextField label="Email" type="email" sx={AuthFormInputStyles} />
        <TextField
          label="Password"
          type="password"
          autoComplete="on"
          sx={AuthFormInputStyles}
        />
        <AuthFormSubmitButton type="submit">Log In</AuthFormSubmitButton>
      </AuthForm>
      <AuthFormFooter>
        Don't have an account?{" "}
        <Link to="/signup" style={AuthFormRedirectLinkStyles}>
          Sign up!
        </Link>
      </AuthFormFooter>
    </AuthFormContainer>
  );
};

export default LoginForm;
