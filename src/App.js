import React, { Children } from "react";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import RegistrationForm from "./pages/RegisrationForm";
import RootPage from "./pages/RootPage";
import ErrorPage from "./pages/ErrorPage";
import UsersPage from "./pages/UsersPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/users",
        element: <UsersPage />
      },
      {
        path: "/register",
        element: <RegistrationForm />
      }
    ]
  },

]);

function App() {

  return (
    <RouterProvider router={router} />
  );
}
export default App;
