import { onAuthStateChanged, User } from "firebase/auth";
import { createContext, PropsWithChildren, useEffect, useState } from "react";
import { auth } from "../firebase";

interface UserContextInitialState {
  currentUser: User | null;
  hasCurrentUserBeenSet: boolean;
}

export const UserContext = createContext<UserContextInitialState>({
  currentUser: null,
  hasCurrentUserBeenSet: false,
});

const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}): JSX.Element => {
  const [userValues, setUserValues] = useState<UserContextInitialState>({
    currentUser: null,
    hasCurrentUserBeenSet: false,
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserValues((prevValues) => ({
        ...prevValues,
        currentUser: user,
        hasCurrentUserBeenSet: true,
      }));
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={userValues}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
