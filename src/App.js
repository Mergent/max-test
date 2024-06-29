import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MainPage from "./pages/MainPage";

const router = createBrowserRouter([
  {
    path: "/users",
    element: <MainPage />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
  );

}
export default App;
