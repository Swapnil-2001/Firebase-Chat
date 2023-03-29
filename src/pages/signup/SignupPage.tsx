import SignupForm from "../../components/forms/SignupForm";
import { SignupPageContainer } from "./SignupPage.styles";

const SignupPage: React.FC = (): JSX.Element => {
  return (
    <SignupPageContainer>
      <SignupForm />
    </SignupPageContainer>
  );
};

export default SignupPage;
