import React from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

const DashPage = () => {
  return (
    <div className=" text-center mt-5">
      <Helmet>
        <title>Dashboard</title>
      </Helmet>
      <h2>Welcome to Dashboard</h2>
      <h4><Link className="btn btn-primary my-4" to="/dashboard/users"> User List</Link></h4>
      <h4><Link className="btn btn-primary my-2" to="/dashboard/products"> Products List</Link></h4>
      
    </div>
  );
};

export default DashPage;
