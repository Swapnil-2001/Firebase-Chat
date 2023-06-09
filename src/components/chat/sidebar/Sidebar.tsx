import { useContext, useEffect, useState } from "react";
import { doc, onSnapshot } from "firebase/firestore";
import LinearProgress from "@mui/material/LinearProgress";

import { db } from "../../../firebase";
import { ChatContext } from "../../../context/ChatContext";
import { UserContext } from "../../../context/UserContext";
import SidebarConversations from "./sidebarComponents/SidebarConversations";
import SidebarSearchResults from "./sidebarComponents/SidebarSearchResults";
import { searchForUsers } from "../../../common/firebaseFunctions";
import { getUnreadConversations } from "../../../common/utils";
import { MessageRecipient, UserConversation } from "../../../common/types";
import {
  SET_NEW_MESSAGE_RECIPIENT,
  SET_UNREAD_CONVERSATIONS,
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

  const [{ conversationId }, dispatch] = useContext(ChatContext);
  const [{ currentUser }] = useContext(UserContext);

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
          if (objectWithUserConversations) {
            const arrayWithUserConversations: UserConversation[] = [];
            Object.values(objectWithUserConversations).forEach(
              (conversation: UserConversation) => {
                arrayWithUserConversations.push(conversation);
              }
            );
            setUserConversations(
              arrayWithUserConversations.sort(
                (conversation1, conversation2) =>
                  conversation2.date - conversation1.date
              )
            );
            const unreadConversations: Set<string> = getUnreadConversations(
              arrayWithUserConversations
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

  const handleKeyPress = (event: React.KeyboardEvent<HTMLElement>): void => {
    if (event.code === "Enter") handleSearchForUser();
  };

  const handleSearchForUser = async (): Promise<void> => {
    setSearchResults([]);
    const querySnapshot = await searchForUsers(searchedUser.toLowerCase());
    querySnapshot?.forEach((doc) => {
      setSearchResults((prevState) => [
        ...prevState,
        doc.data() as SearchedUser,
      ]);
    });
    setHasSearched(true);
  };

  const handleUserSearchInput = (
    event: React.FormEvent<HTMLInputElement>
  ): void => {
    const { value: searchTerm } = event.target as HTMLInputElement;
    setSearchedUser(searchTerm);
    setHasSearched(false);
  };

  const removeSearchTerm = (): void => {
    setSearchedUser("");
  };

  const selectAnUser = (userToBeSelected: MessageRecipient): void => {
    if (!currentUser) return;

    const currentUserId = currentUser.uid;
    const selectedUserId = userToBeSelected.uid;

    const newConversationId =
      currentUserId > selectedUserId
        ? currentUserId + selectedUserId
        : selectedUserId + currentUserId;

    if (conversationId === newConversationId) return;

    dispatch({
      type: SET_NEW_MESSAGE_RECIPIENT,
      payload: {
        conversationId: newConversationId,
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
          removeSearchTerm={removeSearchTerm}
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
