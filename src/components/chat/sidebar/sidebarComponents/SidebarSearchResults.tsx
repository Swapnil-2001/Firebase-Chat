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
  return (
    <SidebarSearchResultsContainer>
      {searchResults.length > 0 ? (
        searchResults?.map((result) => (
          <SidebarSearchResult
            key={result.uid}
            onClick={() => handleSelectSearchedUser(result)}
          >
            <SidebarSearchResultImage
              src={result.photoURL ? result.photoURL : defaultImage}
              alt="User Image"
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
