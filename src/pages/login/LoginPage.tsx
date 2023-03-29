import LoginForm from "../../components/forms/LoginForm";
import { LoginPageContainer } from "./LoginPage.styles";

const LoginPage: React.FC = (): JSX.Element => {
  return (
    <LoginPageContainer>
      <LoginForm />
    </LoginPageContainer>
  );
};

export default LoginPage;
