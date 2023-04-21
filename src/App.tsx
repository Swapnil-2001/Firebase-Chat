import { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";

import { auth } from "./firebase";
import HomePage from "./pages/home/HomePage";
import LoginPage from "./pages/login/LoginPage";
import SignupPage from "./pages/signup/SignupPage";
import { UserContext } from "./context/UserContext";
import { LOGOUT_USER, SET_LOGGED_IN_USER } from "./common/constants";

const App: React.FC = (): JSX.Element => {
  const [hasAppLoaded, setHasAppLoaded] = useState<boolean>(false);
  const [{ currentUser }, dispatch] = useContext(UserContext);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setHasAppLoaded(true);
      if (user) dispatch({ type: SET_LOGGED_IN_USER, payload: user });
      else dispatch({ type: LOGOUT_USER });
    });
    return () => {
      unsubscribe();
    };
  }, [dispatch]);

  const isUserLoggedIn = !hasAppLoaded || currentUser;

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
