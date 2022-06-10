import React, { createContext, useState } from "react";
import { useRouter } from "next/router";

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    token: "",
  });
  const setUserAuthInfo = (data) => {
    // alert(data);
    const token = localStorage.setItem("token", data);
    const ttt = localStorage.getItem("token");
    setAuthState({
      token,
    });
  };

  // checks if the user is authenticated or not
  const isUserAuthenticated = () => {
    if (!authState.token && !localStorage.getItem("token")) {
      return false;
    } else return true;
  };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (userAuthInfo) => setUserAuthInfo(userAuthInfo),
        isUserAuthenticated,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
