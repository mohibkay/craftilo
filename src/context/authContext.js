import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import { css } from "@emotion/react";
import HashLoader from "react-spinners/HashLoader";

const override = css`
  display: flex;
  justify-contents: center;
  align-items: center;
  margin: auto auto;
  margin-top: 20%;
  border-color: #2ec4b6;
`;

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const color = "#2ec4b6";

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    // return () => listener();
  }, []);

  const signUp = (email, password) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const signIn = (email, password) => {
    return auth.signInWithEmailAndPassword(email, password);
  };

  const signOut = () => {
    return auth.signOut();
  };

  const value = {
    currentUser,
    signUp,
    signIn,
    signOut,
  };
  return (
    <AuthContext.Provider value={value} className="h-screen">
      {loading ? <HashLoader color={color} css={override} /> : children}
    </AuthContext.Provider>
  );
}
