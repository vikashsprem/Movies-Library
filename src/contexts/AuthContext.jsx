import { createContext, useContext} from 'react';
import {createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../services/firebase';
import { useState, useEffect } from 'react';

//1: Create a Context
export const AuthContext = createContext()
export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // signup
  const signupUserbyEmailandPassword = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);

  // login
  const loginUserbyEmailandPassword = (email, password) => signInWithEmailAndPassword(auth, email, password);

  //signout
  const signOut = () => {
    return auth.signOut();
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  return (
    <AuthContext.Provider value={{currentUser, isAuthenticated: !!currentUser, signupUserbyEmailandPassword, loginUserbyEmailandPassword,signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
