import React from "react";
import { Helmet } from "react-helmet";

export default function NotFound() {
  return (
    <div className=" text-center mt-5">
      <Helmet>
        <title>404 | Not Founded! </title>
      </Helmet>

      <h3>404</h3>
      <h3>Not Founded!</h3>
    </div>
  );
}
