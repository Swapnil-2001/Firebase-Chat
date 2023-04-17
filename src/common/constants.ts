import { lightBlack } from "./colors";

// Login errors
export const LOGIN_DEFAULT_ERROR_MESSAGE =
  "An error occurred while logging in. Please try again.";

export const USER_NOT_FOUND_ERROR_CODE = "auth/user-not-found";
export const WRONG_PASSWORD_ERROR_CODE = "auth/wrong-password";

export const loginErrorMessages = {
  [USER_NOT_FOUND_ERROR_CODE]:
    "This email does not exist in our database. Please try again.",
  [WRONG_PASSWORD_ERROR_CODE]: "Invalid credentials. Please try again.",
};

// Signup errors
export const SIGNUP_DEFAULT_ERROR_MESSAGE =
  "An error occurred while signing up. Please try again.";

export const EMAIL_ALREADY_IN_USE_ERROR_CODE = "auth/email-already-in-use";

export const signupErrorMessages = {
  [EMAIL_ALREADY_IN_USE_ERROR_CODE]:
    "An user with this email already exists. Please sign up with a different email.",
};

// formFields empty errors
export const NAME_FIELD_IS_EMPTY_ERROR = "Name cannot be empty.";
export const EMAIL_FIELD_IS_EMPTY_ERROR = "Email cannot be empty.";
export const PASSWORD_FIELD_IS_EMPTY_ERROR = "Please provide a password.";
export const PASSWORD_IS_TOO_SHORT_ERROR =
  "Password must be at least 6 characters long.";
export const PASSWORDS_DO_NOT_MATCH_ERROR = "Passwords must match.";

// firestore async call errors
export const ADD_MESSAGE_TO_CONVERSATION_ERROR_MESSAGE =
  "An error occurred while adding a new message to the conversation.";
export const CREATE_NEW_USER_ERROR_MESSAGE =
  "An error occurred while creating a new user.";
export const GET_IMAGE_DOWNLOAD_URL_ERROR_MESSAGE =
  "An error occurred while get the download URL for the image.";
export const SEARCH_USERS_ERROR_MESSAGE =
  "An error occurred while searching for users.";
export const SET_CONVERSATION_AS_READ_ERROR_MESSAGE =
  "An error occurred while changing the status of the conversation to READ.";
export const UPDATE_USER_CHATS_ERROR_MESSAGE =
  "An error occurred while updating user chats.";

// AppContext dispatch constants
export const OPEN_SETTINGS_MODAL = "OPEN_SETTINGS_MODAL";
export const SET_APP_THEME_COLOR = "SET_APP_THEME_COLOR";

// ChatContext dispatch constants
export const RESET_TO_DEFAULT_VALUES = "RESET_TO_DEFAULT_VALUES";
export const SET_NEW_MESSAGE_RECIPIENT = "SET_NEW_MESSAGE_RECIPIENT";
export const SET_SENDING_MESSAGE_LOADING = "SET_SENDING_MESSAGE_LOADING";
export const SET_UNREAD_CONVERSATIONS = "SET_UNREAD_CONVERSATIONS";
export const SHOW_IMAGE = "SHOW_IMAGE";
export const UNHIDE_MESSAGE_WINDOW = "UNHIDE_MESSAGE_WINDOW";

// Names of DB collections
export const ALL_MESSAGES_COLLECTION_NAME = "allMessages";
export const USER_CHATS_COLLECTION_NAME = "chatsByUser";
export const USERS_COLLECTION_NAME = "users";

// Settings modal constants
export const COLOR_PICKER_COLORS = ["#655DBB", "#0A4D68", "#3C486B", "#CE5959"];
export const TWITTER_STYLE = {
  default: {
    input: {
      display: "none",
    },
    hash: {
      display: "none",
    },
    card: {
      display: "flex",
      justifyContent: "center",
      width: "200px",
      backgroundColor: lightBlack,
      boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
    },
  },
};
