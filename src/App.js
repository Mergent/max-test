import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";
import RegistrationForm from "./pages/RegisrationForm";

const router = createBrowserRouter([
  {
    path: "/users",
    element: <MainPage />,
  },
  {
    path:"/register",
    element: <RegistrationForm/>

  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );

}
export default App;
