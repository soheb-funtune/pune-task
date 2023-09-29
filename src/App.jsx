import { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./components/login/login";
import RegistrationForm from "./components/registration/registration";
import "./App.css";
import { useAuthContext } from "./components/auth-context/auth-context";
import ErrorPage from "./components/error-page/error-page";

function App() {
  const { error } = useAuthContext();

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/registration",
      element: <RegistrationForm />,
    },
    {
      path: "/*",
      element: <h1>{`Page not found Error...`}</h1>,
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />;
      {error && <ErrorPage errorText={error} />}
    </>
  );
}

export default App;
