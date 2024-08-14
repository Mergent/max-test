import { useRouteError } from "react-router-dom";
import React from "react"

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Opps!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </div>
  )
};

export default ErrorPage;
