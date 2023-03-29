import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { AddAPhoto, CheckCircle } from "@mui/icons-material";
import { CircularProgress, TextField } from "@mui/material";

import { auth, db, storage } from "../../firebase";
import { ChatContext } from "../../context/ChatContext";
import {
  EMAIL_ALREADY_IN_USE_ERROR_CODE,
  EMAIL_FIELD_IS_EMPTY_ERROR,
  NAME_FIELD_IS_EMPTY_ERROR,
  PASSWORD_FIELD_IS_EMPTY_ERROR,
  PASSWORD_IS_TOO_SHORT_ERROR,
  PASSWORDS_DO_NOT_MATCH_ERROR,
  SIGNUP_DEFAULT_ERROR_MESSAGE,
  signupErrorMessages,
  USERS_COLLECTION_NAME,
  USER_CHATS_COLLECTION_NAME,
  SET_NEW_MESSAGE_RECIPIENT,
} from "../../common/constants";
import {
  AuthForm,
  AuthFormAvatarUploadLabel,
  AuthFormAvatarUploadText,
  AuthFormContainer,
  AuthFormErrorMessage,
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

const SignupForm: React.FC = (): JSX.Element => {
  const [signupFormFields, setSignupFormFields] = useState<SignupFormFields>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userImage, setUserImage] = useState<File | null>(null);
  const [formSubmissionErrors, setFormSubmissionErrors] =
    useState<SignupFormFields>({});
  const [signupError, setSignupError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [, dispatch] = useContext(ChatContext);

  const navigate = useNavigate();

  const handleFormChange = (
    event: React.FormEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const { name, value } = event.target as HTMLTextAreaElement;

    setSignupFormFields((prevFormFields) => ({
      ...prevFormFields,
      [name]: value,
    }));

    setFormSubmissionErrors((prevErrors) => {
      if (name in prevErrors) {
        const {
          [name as keyof typeof formSubmissionErrors]: _,
          ...otherErrors
        } = prevErrors;
        return otherErrors;
      }
      return prevErrors;
    });
  };

  const handleFileUpload = (event: React.FormEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget;
    if (files) setUserImage(files[0]);
  };

  const isFormSubmissionValid = (
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ): boolean => {
    const formSubmissionErrors: SignupFormFields = {};

    if (name.length === 0)
      formSubmissionErrors["name"] = NAME_FIELD_IS_EMPTY_ERROR;

    if (email.length === 0)
      formSubmissionErrors["email"] = EMAIL_FIELD_IS_EMPTY_ERROR;

    if (password.length === 0)
      formSubmissionErrors["password"] = PASSWORD_FIELD_IS_EMPTY_ERROR;
    else if (password.length < 6)
      formSubmissionErrors["password"] = PASSWORD_IS_TOO_SHORT_ERROR;
    else if (password !== confirmPassword)
      formSubmissionErrors["confirmPassword"] = PASSWORDS_DO_NOT_MATCH_ERROR;

    setFormSubmissionErrors(formSubmissionErrors);

    return Object.keys(formSubmissionErrors).length === 0;
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    dispatch({
      type: SET_NEW_MESSAGE_RECIPIENT,
      payload: null,
    });

    const { name, email, password, confirmPassword } = signupFormFields;

    if (
      name === undefined ||
      email === undefined ||
      password === undefined ||
      confirmPassword === undefined ||
      !isFormSubmissionValid(
        name.trim(),
        email.trim(),
        password,
        confirmPassword
      )
    )
      return;

    setIsLoading(true);

    const displayName = name.trim();
    const trimmedEmail = email.trim();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        trimmedEmail,
        password
      );

      let downloadUrl = "";

      if (userImage) {
        const firebaseStorageUrl = `userImages/${uuid()}`;
        const storageRef = ref(storage, firebaseStorageUrl);

        await uploadBytesResumable(storageRef, userImage as File);

        downloadUrl = await getDownloadURL(storageRef);
      }

      const signedUpUser = userCredential.user;
      const signedUpUserId = signedUpUser.uid;

      await updateProfile(signedUpUser, {
        displayName,
        photoURL: downloadUrl,
      });

      // Add data to Firestore
      await setDoc(doc(db, USERS_COLLECTION_NAME, signedUpUserId), {
        uid: signedUpUserId,
        displayName,
        email: trimmedEmail,
        photoURL: downloadUrl,
      });

      await setDoc(doc(db, USER_CHATS_COLLECTION_NAME, signedUpUserId), {});

      navigate("/");
    } catch (error: any) {
      const errorCode: string = error.code;
      switch (errorCode) {
        case EMAIL_ALREADY_IN_USE_ERROR_CODE:
          setSignupError(signupErrorMessages[EMAIL_ALREADY_IN_USE_ERROR_CODE]);
          break;
        default:
          setSignupError(SIGNUP_DEFAULT_ERROR_MESSAGE);
      }
    }

    setIsLoading(false);
  };

  return (
    <AuthFormContainer>
      <AuthFormHeader>Create an Account</AuthFormHeader>
      {signupError.length > 0 && (
        <AuthFormErrorMessage>{signupError}</AuthFormErrorMessage>
      )}
      <AuthForm onSubmit={handleFormSubmit}>
        <TextField
          label="Name"
          name="name"
          type="text"
          onChange={handleFormChange}
          value={signupFormFields.name}
          error={
            formSubmissionErrors.name
              ? formSubmissionErrors.name.length > 0
              : false
          }
          helperText={formSubmissionErrors.name}
          sx={AuthFormInputStyles}
        />
        <TextField
          label="Email"
          name="email"
          type="email"
          onChange={handleFormChange}
          value={signupFormFields.email}
          error={
            formSubmissionErrors.email
              ? formSubmissionErrors.email.length > 0
              : false
          }
          helperText={formSubmissionErrors.email}
          sx={AuthFormInputStyles}
        />
        <TextField
          label="Password"
          name="password"
          type="password"
          onChange={handleFormChange}
          value={signupFormFields.password}
          error={
            formSubmissionErrors.password
              ? formSubmissionErrors.password.length > 0
              : false
          }
          helperText={formSubmissionErrors.password}
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
            formSubmissionErrors.confirmPassword
              ? formSubmissionErrors.confirmPassword?.length > 0
              : false
          }
          helperText={formSubmissionErrors.confirmPassword}
          autoComplete="on"
          sx={AuthFormInputStyles}
        />
        <input
          id="avatarInput"
          name="image"
          type="file"
          accept=".png,.jpeg,.jpg"
          onChange={handleFileUpload}
          style={{ display: "none" }}
        />
        <AuthFormAvatarUploadLabel htmlFor="avatarInput">
          {userImage ? (
            <>
              <CheckCircle color="success" fontSize="large" />
              <AuthFormAvatarUploadText>
                Avatar Uploaded
              </AuthFormAvatarUploadText>
            </>
          ) : (
            <>
              <AddAPhoto color="primary" fontSize="large" />
              <AuthFormAvatarUploadText>Add an avatar</AuthFormAvatarUploadText>
            </>
          )}
        </AuthFormAvatarUploadLabel>
        <AuthFormSubmitButton type="submit">
          {isLoading ? (
            <CircularProgress color="inherit" size={25} />
          ) : (
            "Sign Up"
          )}
        </AuthFormSubmitButton>
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
