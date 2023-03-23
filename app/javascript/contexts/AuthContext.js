import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  networkApiCall,
  AUTH_VALIDATE_TOKEN_END_POINT,
} from "../lib/networking";

export const AuthContext = createContext({
  user: null,
});

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    networkApiCall(AUTH_VALIDATE_TOKEN_END_POINT)
      .then((result) => setUser(result.data.data))
      .catch(() => setUser(null));
  }, []);

  const logOut = useCallback(() => {
    setUser(null);
  }, []);

  const logIn = useCallback((user) => {
    setUser(user);
  }, []);

  const value = useMemo(
    () => ({
      user,
      logOut,
      logIn,
    }),
    [user, logOut, logIn]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
