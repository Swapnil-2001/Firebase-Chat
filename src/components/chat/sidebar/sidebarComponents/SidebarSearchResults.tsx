import { useContext } from "react";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { ChatContext } from "../../../../context/ChatContext";
import { SearchedUser } from "../Sidebar";
import { convertStringToNameFormat } from "../../../../common/utils";
import { MessageRecipient } from "../../../../common/types";
import {
  CloseSearchSectionButton,
  SidebarSearchResult,
  SidebarSearchResultImage,
  SidebarSearchResultName,
  SidebarSearchResultsContainer,
  SidebarSearchResultsHelperText,
} from "../Sidebar.styles";
import defaultImage from "../../../../assets/Default.png";

interface SidebarSearchResultsProps {
  hasSearched: boolean;
  removeSearchTerm: () => void;
  searchResults: SearchedUser[];
  selectAnUser: (userToBeSelected: MessageRecipient) => void;
}

const SidebarSearchResults: React.FC<SidebarSearchResultsProps> = ({
  hasSearched,
  removeSearchTerm,
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
      <CloseSearchSectionButton onClick={removeSearchTerm}>
        <CloseOutlinedIcon />
      </CloseSearchSectionButton>
      {searchResults.length > 0 ? (
        searchResults?.map((result) => (
          <SidebarSearchResult
            key={result.uid}
            onClick={() => handleSelectSearchedUser(result)}
            isSelected={result.uid === messageRecipient?.uid}
          >
            <SidebarSearchResultImage
              src={result.photoURL ? result.photoURL : defaultImage}
              alt="The user searched for"
            />
            <SidebarSearchResultName>
              {convertStringToNameFormat(result.displayName)}
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
