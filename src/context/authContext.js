import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import Loader from "../utils/Loader";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}
