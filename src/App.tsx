import { useContext } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";

import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import { UserContext } from "./context/UserContext";

const App: React.FC = (): JSX.Element => {
  const { currentUser, hasCurrentUserBeenSet } = useContext(UserContext);

  const isUserLoggedIn = !hasCurrentUserBeenSet || currentUser;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={isUserLoggedIn ? <HomePage /> : <Navigate to="/login" />}
        />
        <Route
          path="/login"
          element={!isUserLoggedIn ? <LoginPage /> : <Navigate to="/" />}
        />
        <Route
          path="/signup"
          element={!isUserLoggedIn ? <SignupPage /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
