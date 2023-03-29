import ChatBox from "../../components/chat/chatBox/ChatBox";
import { HomePageContainer } from "./HomePage.styles";

const Home: React.FC = (): JSX.Element => {
  return (
    <HomePageContainer>
      <ChatBox />
    </HomePageContainer>
  );
};

export default Home;
