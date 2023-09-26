// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { createContext, useContext, useState } from "react";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRAtPi8x0to-W_qfm2A8_9H4zXa27Wr-4",
  authDomain: "pune-task.firebaseapp.com",
  projectId: "pune-task",
  storageBucket: "pune-task.appspot.com",
  messagingSenderId: "340169052954",
  appId: "1:340169052954:web:bcef677d92dcea64e492a3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();

export const AuthContext = createContext();

export const useAuthContext = () => {
  return useContext(AuthContext);
};

export const ContextWrap = ({ children }) => {
  const [token, setToken] = useState(null);
  return (
    <AuthContext.Provider
      value={{ count: "20", auth, provider, token, setToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};
