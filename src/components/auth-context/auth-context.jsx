// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { createContext, useContext, useState } from "react";
import HttpClient from "../../api/httpClient";
import ErrorPage from "../error-page/error-page";
import { useNavigate } from "react-router-dom";

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
  const [error, setError] = useState("");
  const [apiData, setApiData] = useState(null);
  const ApiCall = async (postData, endPoint) => {
    try {
      const { data, message, errors, success } = await HttpClient(endPoint, {
        method: "POST",
        data: postData,
        // queryParams: {
        //   _postman_id: "cd180430-eb23-4482-98fb-db91ca7cff3c",
        //   name: "login flow for testing",
        //   schema:
        //     "https://schema.getpostman.com/json/collection/v2.1.0/collection.json",
        //   _exporter_id: "8314233",
        // },
      });
      if (data || success) {
        setApiData(data || message);
        setToken(data?.token);
        console.log(data || message);
        setError(errors || message);
      } else {
        setError(errors || message);
        console.log("else Error", errors || message);
      }
    } catch (err) {
      setError(err);
    }
  };
  console.log("errrorState:", error);
  return (
    <AuthContext.Provider
      value={{
        count: "20",
        auth,
        provider,
        token,
        setToken,
        ApiCall,
        setApiData,
        setError,
        error,
        apiData,
      }}
    >
      {children}
      {error && <ErrorPage errorText={error} />}
    </AuthContext.Provider>
  );
};
