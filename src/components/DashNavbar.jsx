import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../actions/userActions";

const DashNavbar = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-light bg-dark p-2 mb-4">
      <Link className={pathname === "/" ? "btn link-secondary" : "btn link-light"} to="/">
        Home
      </Link>
      <Link className={pathname === "/dashboard" ? "btn link-secondary" : "btn link-light"} to="/dashboard">
        Dashboard
      </Link>
      <Link
        className={pathname === "/dashboard/products" ? "btn link-secondary" : "btn link-light"}
        to="/dashboard/products"
      >
        Products
      </Link>
      <div className="d-flex justify-content-end ">
        <Link className={pathname === "/profile" ? "btn link-secondary" : "btn link-light"} to="/profile">
          Profile
        </Link>
        <Link className="btn link-light me-4" to="#logout" onClick={logoutHandler}>
          Logout
        </Link>
      </div>
    </nav>
  );
};

export default DashNavbar;
