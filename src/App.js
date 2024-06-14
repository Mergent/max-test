import React from "react";
import {createBrowserRouter, Link, RouterProvider} from "react-router-dom";
import Wtf from "./pages/Wtf";
import MainPage from "./pages/MainPage"

const router = createBrowserRouter([
  {
    path: "/users",
    element: <MainPage />,
  },
]);

function App() {

  return (
    <RouterProvider router={router} />
    // <BrowseRouter>
    // <div>
    //   <div>
    //     <Link to="/Wtf">КТО</Link>
    //     <Link to="/MainPage">ГДЕ</Link>
    //   </div>
    // </div>
    //   <Route path="/Wtf">
    //     <Wtf/>
    //   </Route>
    //   <Route path="/MainPage">
    //     <MainPage/>
    //   </Route>
    // </BrowseRouter>
  );

}
export default App;
