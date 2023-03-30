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

export const SET_NEW_MESSAGE_RECIPIENT = "SET_NEW_MESSAGE_RECIPIENT";

export const USERS_COLLECTION_NAME = "users";
export const ALL_MESSAGES_COLLECTION_NAME = "allMessages";
export const USER_CHATS_COLLECTION_NAME = "chatsByUser";

// userChats: list of uIDs
// uID: list of combinedIDs
// combinedID: {
//    lastMessage: {
//      text: string
//    },
//    date,
//    userInfo: {
//      displayName: string,
//      photoURL: string,
//      uid: string
//    }
// }