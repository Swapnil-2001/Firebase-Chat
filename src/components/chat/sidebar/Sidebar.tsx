import { useContext, useEffect, useState } from "react";
import {
  collection,
  doc,
  endAt,
  getDocs,
  onSnapshot,
  orderBy,
  query,
  startAt,
  updateDoc,
} from "firebase/firestore";
import LinearProgress from "@mui/material/LinearProgress";

import { db } from "../../../firebase";
import { ChatContext } from "../../../context/ChatContext";
import { UserContext } from "../../../context/UserContext";
import SidebarConversations from "./sidebarComponents/SidebarConversations";
import SidebarSearchResults from "./sidebarComponents/SidebarSearchResults";
import { MessageRecipient } from "../../../common/types";
import {
  SET_NEW_MESSAGE_RECIPIENT,
  SET_UNREAD_CONVERSATIONS,
  USERS_COLLECTION_NAME,
  USER_CHATS_COLLECTION_NAME,
} from "../../../common/constants";
import {
  LinearProgressStyles,
  SidebarContainer,
  SidebarSearchInput,
} from "./Sidebar.styles";

export interface SearchedUser {
  uid: string;
  displayName: string;
  photoURL: string;
}

export interface UserConversation {
  userInfo: MessageRecipient;
  lastMessage: {
    messageText: string;
  };
  date: any;
  isRead: boolean;
}

const Sidebar: React.FC = (): JSX.Element => {
  // The search term
  const [searchedUser, setSearchedUser] = useState<string>("");
  // The search results
  const [searchResults, setSearchResults] = useState<SearchedUser[]>([]);
  // Checks if "Enter" has been pressed
  const [hasSearched, setHasSearched] = useState<boolean>(false);
  const [userConversations, setUserConversations] = useState<
    UserConversation[]
  >([]);
  const [areConversationsLoading, setAreConversationsLoading] =
    useState<boolean>(true);

  const [{ conversationId, unreadConversations }, dispatch] =
    useContext(ChatContext);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (searchedUser.length === 0) setSearchResults([]);
  }, [searchedUser]);

  useEffect(() => {
    // Fetch conversations for the current user
    if (currentUser) {
      const unsubscribe = onSnapshot(
        doc(db, USER_CHATS_COLLECTION_NAME, currentUser.uid),
        (document) => {
          const objectWithUserConversations = document.data();

          const unreadConversations: { [key: string]: boolean } = {};

          if (objectWithUserConversations) {
            const arrayWithUserConversations: UserConversation[] = [];
            Object.values(objectWithUserConversations).forEach(
              (conversation: UserConversation) => {
                if (!conversation.isRead)
                  unreadConversations[conversation.userInfo.uid] = true;
                arrayWithUserConversations.push(conversation);
              }
            );
            setUserConversations(
              arrayWithUserConversations.sort(
                (conversation1, conversation2) =>
                  conversation2.date - conversation1.date
              )
            );
            dispatch({
              type: SET_UNREAD_CONVERSATIONS,
              payload: unreadConversations,
            });
            setAreConversationsLoading(false);
          }
        }
      );

      return () => unsubscribe();
    }
    return;
  }, [currentUser, dispatch]);

  useEffect(() => {
    const userId = Object.keys(unreadConversations).find(
      (userId) => unreadConversations[userId] === false
    );
    if (currentUser && userId) {
      (async () => {
        try {
          await updateDoc(
            doc(db, USER_CHATS_COLLECTION_NAME, currentUser.uid),
            {
              [`${conversationId}.isRead`]: true,
            }
          );
        } catch (error) {
          console.error(error);
        }
      })();
    }
  }, [conversationId, currentUser, unreadConversations]);

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.code === "Enter") searchForUser();
  };

  const handleUserSearchInput = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { value: searchTerm } = event.target as HTMLInputElement;
    setSearchedUser(searchTerm);
    setHasSearched(false);
  };

  const searchForUser = async () => {
    setSearchResults([]);

    const usersRef = collection(db, USERS_COLLECTION_NAME);

    const searchQuery = query(
      usersRef,
      orderBy("displayName"),
      startAt(searchedUser),
      endAt(searchedUser + "\uf8ff")
    );

    try {
      const querySnapshot = await getDocs(searchQuery);
      querySnapshot.forEach((doc) => {
        setSearchResults((prevState) => [
          ...prevState,
          doc.data() as SearchedUser,
        ]);
      });
      setHasSearched(true);
    } catch (error) {
      console.error(error);
    }
  };

  const selectAnUser = (userToBeSelected: MessageRecipient): void => {
    if (!currentUser) return;

    const currentUserId = currentUser.uid;
    const selectedUserId = userToBeSelected.uid;

    const conversationId =
      currentUserId > selectedUserId
        ? currentUserId + selectedUserId
        : selectedUserId + currentUserId;

    dispatch({
      type: SET_NEW_MESSAGE_RECIPIENT,
      payload: {
        conversationId,
        messageRecipient: userToBeSelected,
      },
    });
  };

  return (
    <SidebarContainer>
      <SidebarSearchInput
        type="text"
        placeholder="Search users..."
        value={searchedUser}
        onChange={handleUserSearchInput}
        onKeyDown={handleKeyPress}
      />
      {searchedUser.length > 0 ? (
        <SidebarSearchResults
          hasSearched={hasSearched}
          searchResults={searchResults}
          selectAnUser={selectAnUser}
        />
      ) : areConversationsLoading ? (
        <LinearProgress sx={LinearProgressStyles} />
      ) : (
        <SidebarConversations
          selectAnUser={selectAnUser}
          userConversations={userConversations}
        />
      )}
    </SidebarContainer>
  );
};

export default Sidebar;
