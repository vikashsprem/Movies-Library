import { createContext, useContext, useEffect, useState } from 'react';

import { auth } from '../services/firebase';

//1: Create a Context
export const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export default function AuthProvider({ children }) {

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
    });
    return unsubscribe;
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

  return (
    <AuthContext.Provider value={{ currentUser, signUp, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}
