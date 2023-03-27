import { useState } from "react";
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

interface LoginFormFields {
  email?: string;
  password?: string;
}

const LoginForm = () => {
  const [loginFormFields, setLoginFormFields] = useState<LoginFormFields>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<LoginFormFields>({});

  const handleFormChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target as HTMLTextAreaElement;
    setLoginFormFields((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));
    setErrors((prevErrors) => {
      if (name in prevErrors) {
        const { [name as keyof typeof errors]: _, ...otherErrors } = prevErrors;
        return otherErrors;
      }
      return prevErrors;
    });
  };

  const isFormSubmissionValid = (email: string, password: string) => {
    if (email.trim().length === 0)
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email cannot be empty.",
      }));
    if (password.length === 0)
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please provide the password.",
      }));

    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { email, password } = loginFormFields;

    if (
      email === undefined ||
      password === undefined ||
      !isFormSubmissionValid(email, password)
    )
      return;
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader>Welcome Back</AuthFormHeader>
      <AuthForm onSubmit={handleFormSubmit}>
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={handleFormChange}
          value={loginFormFields.email}
          error={errors.email ? errors.email.length > 0 : false}
          helperText={errors.email}
          sx={AuthFormInputStyles}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleFormChange}
          value={loginFormFields.password}
          error={errors.password ? errors.password.length > 0 : false}
          helperText={errors.password}
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
