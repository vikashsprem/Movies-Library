// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createContext, useContext } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const FirebaseContext = createContext(null);

const firebaseConfig = {
  
};

// Initialize Firebase
export const useFirebase = () => useContext(FirebaseContext);

const firebaseApp = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(firebaseApp);

export const FirebaseProvider = (props) => {

  const signupUserbyEmailandPassword = (email, password) =>
      createUserWithEmailAndPassword(firebaseAuth, email, password);

  const loginUserbyEmailandPassword = (email, password) => signInWithEmailAndPassword(firebaseAuth, email, password);

  return (
      <FirebaseContext.Provider value={{ signupUserbyEmailandPassword, loginUserbyEmailandPassword }}>
          {props.children}
      </FirebaseContext.Provider>
  );
};