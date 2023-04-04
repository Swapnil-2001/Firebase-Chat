import { useContext } from "react";

import { ChatContext } from "../../../../context/ChatContext";
import { SearchedUser } from "../Sidebar";
import { MessageRecipient } from "../../../../common/types";
import {
  SidebarSearchResult,
  SidebarSearchResultImage,
  SidebarSearchResultName,
  SidebarSearchResultsContainer,
  SidebarSearchResultsHelperText,
} from "../Sidebar.styles";
import defaultImage from "../../../../assets/Default.png";

interface SidebarSearchResultsProps {
  hasSearched: boolean;
  searchResults: SearchedUser[];
  selectAnUser: (userToBeSelected: MessageRecipient) => void;
}

const SidebarSearchResults: React.FC<SidebarSearchResultsProps> = ({
  hasSearched,
  searchResults,
  selectAnUser,
}): JSX.Element => {
  const [{ messageRecipient }] = useContext(ChatContext);

  const handleSelectSearchedUser = (user: SearchedUser): void => {
    const { uid, displayName, photoURL } = user;

    const userToBeSelected = {
      uid,
      displayName,
      photoURL,
    };

    selectAnUser(userToBeSelected);
  };

  return (
    <SidebarSearchResultsContainer>
      {searchResults.length > 0 ? (
        searchResults?.map((result) => (
          <SidebarSearchResult
            key={result.uid}
            onClick={() => handleSelectSearchedUser(result)}
            isSelected={result.uid === messageRecipient?.uid}
          >
            <SidebarSearchResultImage
              src={result.photoURL ? result.photoURL : defaultImage}
              alt="The user searched for."
            />
            <SidebarSearchResultName>
              {result.displayName}
            </SidebarSearchResultName>
          </SidebarSearchResult>
        ))
      ) : hasSearched ? (
        <SidebarSearchResultsHelperText>
          No users match your search.
        </SidebarSearchResultsHelperText>
      ) : (
        <SidebarSearchResultsHelperText>
          Press "Enter" to search.
        </SidebarSearchResultsHelperText>
      )}
    </SidebarSearchResultsContainer>
  );
};

export default SidebarSearchResults;
