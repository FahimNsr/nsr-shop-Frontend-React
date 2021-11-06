import React from "react";
import { Helmet } from "react-helmet";

const DashPage = () => {
  return (
    <div className=" text-center mt-5">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h3>Welcome to Dashboard</h3>
    </div>
  );
};

export default DashPage;
