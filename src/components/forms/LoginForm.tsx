import { useContext, useState } from "react";
import { Link, NavigateFunction, useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { CircularProgress, TextField } from "@mui/material";

import { auth } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";
import {
  EMAIL_FIELD_IS_EMPTY_ERROR,
  loginErrorMessages,
  LOGIN_DEFAULT_ERROR_MESSAGE,
  PASSWORD_FIELD_IS_EMPTY_ERROR,
  SET_NEW_MESSAGE_RECIPIENT,
  USER_NOT_FOUND_ERROR_CODE,
  WRONG_PASSWORD_ERROR_CODE,
} from "../../common/constants";
import {
  AuthForm,
  AuthFormContainer,
  AuthFormErrorMessage,
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

const LoginForm: React.FC = (): JSX.Element => {
  const [loginFormFields, setLoginFormFields] = useState<LoginFormFields>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<LoginFormFields>({});
  const [loginError, setLoginError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [, dispatch] = useContext(ChatContext);

  const navigate: NavigateFunction = useNavigate();

  const handleFormChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ): void => {
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

  const isFormSubmissionValid = (email: string, password: string): boolean => {
    const formSubmissionErrors: LoginFormFields = {};

    if (email.length === 0)
      formSubmissionErrors["email"] = EMAIL_FIELD_IS_EMPTY_ERROR;
    if (password.length === 0)
      formSubmissionErrors["password"] = PASSWORD_FIELD_IS_EMPTY_ERROR;

    setErrors(formSubmissionErrors);

    return Object.keys(formSubmissionErrors).length === 0;
  };

  const handleFormSubmit = async (
    event: React.SyntheticEvent
  ): Promise<void> => {
    event.preventDefault();

    dispatch({
      type: SET_NEW_MESSAGE_RECIPIENT,
      payload: null,
    });

    const { email, password } = loginFormFields;

    if (
      email === undefined ||
      password === undefined ||
      !isFormSubmissionValid(email.trim(), password)
    )
      return;

    setIsLoading(true);

    const trimmedEmail = email.trim();

    try {
      await signInWithEmailAndPassword(auth, trimmedEmail, password);
      navigate("/");
    } catch (error: any) {
      const errorCode = error.code;
      switch (errorCode) {
        case USER_NOT_FOUND_ERROR_CODE:
          setLoginError(loginErrorMessages[USER_NOT_FOUND_ERROR_CODE]);
          break;
        case WRONG_PASSWORD_ERROR_CODE:
          setLoginError(loginErrorMessages[WRONG_PASSWORD_ERROR_CODE]);
          break;
        default:
          setLoginError(LOGIN_DEFAULT_ERROR_MESSAGE);
      }
    }

    setIsLoading(false);
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader>Welcome Back</AuthFormHeader>
      {loginError.length > 0 && (
        <AuthFormErrorMessage>{loginError}</AuthFormErrorMessage>
      )}
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
        <AuthFormSubmitButton type="submit">
          {isLoading ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            "Log In"
          )}
        </AuthFormSubmitButton>
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
