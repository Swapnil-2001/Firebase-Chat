import { useContext } from "react";

import { ChatContext } from "../../../../context/ChatContext";
import { SearchedUser } from "../Sidebar";
import {
  SidebarSearchResult,
  SidebarSearchResultImage,
  SidebarSearchResultName,
  SidebarSearchResultsContainer,
  SidebarSearchResultsHelperText,
} from "../Sidebar.styles";
import defaultImage from "../../../../assets/Default.png";

interface SidebarSearchResultsProps {
  handleSelectSearchedUser: (_: any) => void;
  hasSearched: boolean;
  searchResults: SearchedUser[];
}

const SidebarSearchResults: React.FC<SidebarSearchResultsProps> = ({
  handleSelectSearchedUser,
  hasSearched,
  searchResults,
}): JSX.Element => {
  const [{ messageRecipient }] = useContext(ChatContext);

  const handleSelectAnUser = (user: SearchedUser) => {
    handleSelectSearchedUser(user);
  };

  return (
    <SidebarSearchResultsContainer>
      {searchResults.length > 0 ? (
        searchResults?.map((result) => (
          <SidebarSearchResult
            key={result.uid}
            onClick={() => handleSelectAnUser(result)}
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
