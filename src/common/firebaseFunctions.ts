import {
  createUserWithEmailAndPassword,
  updateProfile,
  User,
  UserCredential,
} from "firebase/auth";
import {
  arrayUnion,
  collection,
  doc,
  DocumentData,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  QuerySnapshot,
  setDoc,
  startAt,
  Timestamp,
  updateDoc,
} from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { v4 as uuid } from "uuid";

import { auth, db, storage } from "../firebase";
import { MessageRecipient } from "./types";
import {
  ALL_MESSAGES_COLLECTION_NAME,
  ADD_MESSAGE_TO_CONVERSATION_ERROR_MESSAGE,
  GET_IMAGE_DOWNLOAD_URL_ERROR_MESSAGE,
  SET_CONVERSATION_AS_READ_ERROR_MESSAGE,
  SEARCH_USERS_ERROR_MESSAGE,
  USERS_COLLECTION_NAME,
  UPDATE_USER_CHATS_ERROR_MESSAGE,
  USER_CHATS_COLLECTION_NAME,
  CREATE_NEW_USER_ERROR_MESSAGE,
  LIKE_MESSAGE_ERROR_MESSAGE,
  SIGNUP_ERROR_MESSAGE,
  CHANGE_USER_PROFILE_PICTURE_ERROR_MESSAGE,
} from "./constants";

export const addNewMessageToConversation = async (
  conversationId: string,
  newMessageCreated: any
): Promise<void> => {
  try {
    const docRef = doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(docRef, {
        messages: [newMessageCreated],
      });
    } else {
      await updateDoc(docRef, {
        messages: arrayUnion(newMessageCreated),
      });
    }
  } catch (error) {
    console.error(ADD_MESSAGE_TO_CONVERSATION_ERROR_MESSAGE);
  }
};

export const changeProfilePicture = async (
  updatedUserImage: File,
  loggedInUser: User
): Promise<void> => {
  try {
    const usersDocReference = doc(db, USERS_COLLECTION_NAME, loggedInUser.uid);
    const userDocSnap = await getDoc(usersDocReference);
    if (!userDocSnap.exists()) return;
    const prevImageStorageLocation = userDocSnap.data().imageStorageLocation;
    if (prevImageStorageLocation !== "") {
      const imageRef = ref(storage, prevImageStorageLocation);
      await deleteObject(imageRef);
    }
    const firebaseStorageUrl: string = `userImages/${uuid()}`;
    const downloadUrl = await getImageDownloadUrl(
      firebaseStorageUrl,
      updatedUserImage
    );
    await updateProfile(loggedInUser, {
      photoURL: downloadUrl,
    });
    await updateDoc(usersDocReference, {
      photoURL: downloadUrl,
      imageStorageLocation: firebaseStorageUrl,
    });
  } catch (error) {
    console.error(CHANGE_USER_PROFILE_PICTURE_ERROR_MESSAGE);
  }
};

export const createNewUser = async (
  displayName: string,
  downloadUrl: string,
  signedUpUserId: string,
  trimmedEmail: string,
  imageStorageLocation: string
) => {
  try {
    const usersDocReference = doc(db, USERS_COLLECTION_NAME, signedUpUserId);
    await setDoc(usersDocReference, {
      uid: signedUpUserId,
      displayName,
      email: trimmedEmail,
      photoURL: downloadUrl,
      imageStorageLocation,
    });
    const userChatsDocReference = doc(
      db,
      USER_CHATS_COLLECTION_NAME,
      signedUpUserId
    );
    await setDoc(userChatsDocReference, {});
  } catch (error) {
    console.error(CREATE_NEW_USER_ERROR_MESSAGE);
  }
};

export const getImageDownloadUrl = async (
  firebaseStorageUrl: string,
  selectedImage: File
): Promise<string> => {
  try {
    const imageStorageRef = ref(storage, firebaseStorageUrl);

    await uploadBytesResumable(imageStorageRef, selectedImage);

    const downloadUrl = await getDownloadURL(imageStorageRef);
    return downloadUrl;
  } catch (error) {
    console.error(GET_IMAGE_DOWNLOAD_URL_ERROR_MESSAGE);
    return "";
  }
};

export const likeMessage = async (
  conversationId: string,
  messageId: string
) => {
  try {
    const docRef = doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const messagesInConversation = docSnap.get("messages");

      const modifiedMessages = messagesInConversation.map((message: any) => {
        if (message.id === messageId) message.isLiked = !message.isLiked;
        return message;
      });
      await setDoc(docRef, {
        messages: modifiedMessages,
      });
    }
  } catch (error) {
    console.error(LIKE_MESSAGE_ERROR_MESSAGE);
  }
};

export const searchForUsers = async (
  searchedUser: string
): Promise<QuerySnapshot<DocumentData> | null> => {
  const usersRef = collection(db, USERS_COLLECTION_NAME);
  const searchQuery = query(
    usersRef,
    orderBy("displayName"),
    startAt(searchedUser),
    endAt(searchedUser + "\uf8ff")
  );
  try {
    const querySnapshot = await getDocs(searchQuery);
    return querySnapshot;
  } catch (_) {
    console.error(SEARCH_USERS_ERROR_MESSAGE);
    return null;
  }
};

export const setConversationAsRead = async (
  conversationId: string,
  currentUserId: string
): Promise<void> => {
  try {
    const docReference = doc(db, USER_CHATS_COLLECTION_NAME, currentUserId);
    await updateDoc(docReference, {
      [`${conversationId}.isRead`]: true,
    });
  } catch (_) {
    console.error(SET_CONVERSATION_AS_READ_ERROR_MESSAGE);
  }
};

export const signUpUser = async (
  displayName: string,
  email: string,
  password: string,
  userImage: File | null
): Promise<void> => {
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    let downloadUrl: string = "";
    let firebaseStorageUrl: string = `userImages/${uuid()}`;
    if (userImage)
      downloadUrl = await getImageDownloadUrl(firebaseStorageUrl, userImage);
    else firebaseStorageUrl = "";

    const signedUpUser: User = userCredential.user;
    const signedUpUserId: string = signedUpUser.uid;
    await updateProfile(signedUpUser, {
      displayName,
      photoURL: downloadUrl,
    });
    // Add data to Firestore
    await createNewUser(
      displayName.toLowerCase(),
      downloadUrl,
      signedUpUserId,
      email,
      firebaseStorageUrl
    );
  } catch (error) {
    console.error(SIGNUP_ERROR_MESSAGE);
  }
};

export const updateUserChats = async (
  conversationId: string,
  idOfUser1: string,
  user2: MessageRecipient,
  idOfSender: string,
  typedMessage: string,
  conversationReadStatus: boolean
): Promise<void> => {
  try {
    const docReference = doc(db, USER_CHATS_COLLECTION_NAME, idOfUser1);
    await updateDoc(docReference, {
      [`${conversationId}.userInfo`]: {
        uid: user2.uid,
        displayName: user2.displayName,
        photoURL: user2.photoURL,
      },
      [`${conversationId}.lastMessage`]: {
        messageText: typedMessage,
        idOfSender,
      },
      [`${conversationId}.date`]: Timestamp.now(),
      [`${conversationId}.isRead`]: conversationReadStatus,
    });
  } catch (error) {
    console.error(UPDATE_USER_CHATS_ERROR_MESSAGE);
  }
};
