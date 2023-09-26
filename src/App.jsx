import { useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Login from "./components/login/login";
import RegistrationForm from "./components/registration/registration";
import "./App.css";

function App() {
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;
