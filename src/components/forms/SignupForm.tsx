import { useState } from "react";
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

interface SignupFormFields {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const regexForEmailCheck = new RegExp(
  /^[A-Za-z0-9_!#$%&'*+/=?`{|}~^.-]+@[A-Za-z0-9.-]+$/,
  "gm"
);

const SignupForm = () => {
  const [signupFormFields, setSignupFormFields] = useState<SignupFormFields>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<SignupFormFields>({});

  const handleFormChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target as HTMLTextAreaElement;
    setSignupFormFields((prevFormFields) => ({
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

  const isFormSubmissionValid = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): boolean => {
    if (name.trim().length === 0)
      setErrors((prevErrors) => ({
        ...prevErrors,
        name: "Name cannot be empty.",
      }));

    if (email.trim().length === 0)
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Email cannot be empty.",
      }));
    else if (!regexForEmailCheck.test(email.trim()))
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Please provide a valid email.",
      }));

    if (password.length === 0)
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Please provide a password.",
      }));
    else if (password.length < 6)
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters long.",
      }));
    else if (password !== confirmPassword)
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords must match.",
      }));

    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const { name, email, password, confirmPassword } = signupFormFields;

    if (
      name === undefined ||
      email === undefined ||
      password === undefined ||
      confirmPassword === undefined ||
      !isFormSubmissionValid(name, email, password, confirmPassword)
    )
      return;
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader>Create an Account</AuthFormHeader>
      <AuthForm onSubmit={handleFormSubmit}>
        <TextField
          label="Name"
          name="name"
          type="text"
          onChange={handleFormChange}
          value={signupFormFields.name}
          error={errors.name ? errors.name.length > 0 : false}
          helperText={errors.name}
          sx={AuthFormInputStyles}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={handleFormChange}
          value={signupFormFields.email}
          error={errors.email ? errors.email.length > 0 : false}
          helperText={errors.email}
          sx={AuthFormInputStyles}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleFormChange}
          value={signupFormFields.password}
          error={errors.password ? errors.password.length > 0 : false}
          helperText={errors.password}
          autoComplete="on"
          sx={AuthFormInputStyles}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          onChange={handleFormChange}
          value={signupFormFields.confirmPassword}
          error={
            errors.confirmPassword ? errors.confirmPassword?.length > 0 : false
          }
          helperText={errors.confirmPassword}
          autoComplete="on"
          sx={AuthFormInputStyles}
        />
        <input
          id="avatarInput"
          name="image"
          type="file"
          style={{ display: "none" }}
        />
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
