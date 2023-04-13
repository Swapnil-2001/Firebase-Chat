import {
  Timestamp,
  arrayUnion,
  collection,
  doc,
  endAt,
  getDoc,
  getDocs,
  orderBy,
  query,
  setDoc,
  startAt,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

import { db, storage } from "../firebase";
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
} from "./constants";

export const addNewMessageToConversation = async (
  conversationId: string,
  newMessageCreated: any
) => {
  try {
    const docRef = doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      await setDoc(doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId), {
        messages: [newMessageCreated],
      });
    } else {
      await updateDoc(doc(db, ALL_MESSAGES_COLLECTION_NAME, conversationId), {
        messages: arrayUnion(newMessageCreated),
      });
    }
  } catch (error) {
    console.error(ADD_MESSAGE_TO_CONVERSATION_ERROR_MESSAGE);
  }
};

export const getImageDownloadUrl = async (
  firebaseStorageUrl: string,
  selectedImage: File
) => {
  try {
    const messageImageStorageRef = ref(storage, firebaseStorageUrl);

    await uploadBytesResumable(messageImageStorageRef, selectedImage);

    const downloadUrl = await getDownloadURL(messageImageStorageRef);
    return downloadUrl;
  } catch (error) {
    console.error(GET_IMAGE_DOWNLOAD_URL_ERROR_MESSAGE);
    return "";
  }
};

export const searchForUsers = async (searchedUser: string) => {
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
) => {
  try {
    const docReference = doc(db, USER_CHATS_COLLECTION_NAME, currentUserId);
    await updateDoc(docReference, {
      [`${conversationId}.isRead`]: true,
    });
  } catch (_) {
    console.error(SET_CONVERSATION_AS_READ_ERROR_MESSAGE);
  }
};

export const updateUserChats = async (
  conversationId: string,
  idOfUser1: string,
  user2: MessageRecipient,
  typedMessage: string,
  conversationReadStatus: boolean
) => {
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
      },
      [`${conversationId}.date`]: Timestamp.now(),
      [`${conversationId}.isRead`]: conversationReadStatus,
    });
  } catch (error) {
    console.error(UPDATE_USER_CHATS_ERROR_MESSAGE);
  }
};
