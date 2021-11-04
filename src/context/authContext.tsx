import React, { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../lib/firebase";
import Loader from "../utils/Loader";
import firebase from "firebase/app";

interface Props {
  children: React.ReactNode;
}

interface AuthContextInterface {
  currentUser: firebase.User | null;
  signUp: (email: string, password: string) => void;
  signIn: (email: string, password: string) => void;
  signOut: () => void;
}

const AuthContext = createContext({} as AuthContextInterface);

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: Props) {
  const [currentUser, setCurrentUser] = useState<firebase.User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const listener = auth.onAuthStateChanged((user) => {
      console.log("user");
      console.log(user);
      setCurrentUser(user);
      setLoading(false);
    });

    return () => listener();
  }, []);

  const signUp = (email: string, password: string) => {
    return auth.createUserWithEmailAndPassword(email, password);
  };
  const signIn = (email: string, password: string) => {
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
    <AuthContext.Provider value={value}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
}
