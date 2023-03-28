import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 as uuid } from "uuid";
import { AddAPhoto, CheckCircle } from "@mui/icons-material";
import { CircularProgress, TextField } from "@mui/material";

import { auth, db, storage } from "../../firebase";
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

const SignupForm = () => {
  const [signupFormFields, setSignupFormFields] = useState<SignupFormFields>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [userImage, setUserImage] = useState<File | null>(null);
  const [errors, setErrors] = useState<SignupFormFields>({});
  const [signupError, setSignupError] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const navigate = useNavigate();

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
      formSubmissionErrors["name"] = "Name cannot be empty.";

    if (email.length === 0)
      formSubmissionErrors["email"] = "Email cannot be empty.";

    if (password.length === 0)
      formSubmissionErrors["password"] = "Please provide a password.";
    else if (password.length < 6)
      formSubmissionErrors["password"] =
        "Password must be at least 6 characters long.";
    else if (password !== confirmPassword)
      formSubmissionErrors["confirmPassword"] = "Passwords must match.";

    setErrors(formSubmissionErrors);

    return Object.keys(formSubmissionErrors).length === 0;
  };

  const handleFormSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    setIsLoading(true);

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
      await setDoc(doc(db, "users", signedUpUserId), {
        uid: signedUpUserId,
        displayName,
        email: trimmedEmail,
        photoUrl: downloadUrl,
      });

      navigate("/");
    } catch (error: any) {
      const errorCode: string = error.code;
      switch (errorCode) {
        case "auth/email-already-in-use":
          setSignupError(
            "An user with this email already exists. Please sign up with a different email."
          );
          break;
        default:
          setSignupError(
            "An error occurred while signing up. Please try again."
          );
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
