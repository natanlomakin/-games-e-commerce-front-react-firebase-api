import axios from "axios";
import { createContext, useState, useEffect } from "react";
import { SERVER_URL } from "../utils/serverUtil";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(null);
  const [user, setUser] = useState(null);

  let loginUser = (e) => {
    e.preventDefault();
    console.log("form submited");
    /* let response = axios.post(SERVER_URL + "/login/loginuser/", {
      Headers: {
        "Content-Type": "applications/json",
      },
      body: JSON.stringify({ username: null, password: null }),
    }); */
  };

  let contextData = { loginUser: loginUser };

  return (
    <AuthContext.Provider value={{ contextData }}>
      {children}
    </AuthContext.Provider>
  );
};
