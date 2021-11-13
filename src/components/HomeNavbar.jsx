import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "../components/SearchBox";

const HomeNavbar = () => {
  let { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <nav className="navbar navbar-light bg-dark p-2 rounded-bottom mb-3">
      <div className="col-auto">
        <Link className="navbar-brand ms-4" to="/">
          <img height="30" width="30"src="http://localhost:8000/logo.jpg" alt="logo" />
        </Link>
        <Link className={pathname === "/" ? "btn link-secondary" : "btn link-light"} to="/">
          Home
        </Link>
        <Link className={pathname === "/products" ? "btn link-secondary" : "btn link-light"} to="/products">
          Products
        </Link>
      </div>
      <div className="col-auto ">
        <SearchBox />
      </div>
      <div className="col-auto d-flex justify-content-end">
        <Link className={pathname === "/cart" ? "btn link-secondary" : "btn link-light"} to="/cart">
          Cart {cartItems.length > 0 && <span className="badge rounded-pill bg-success">{cartItems.length}</span>}
        </Link>
        {userInfo ? (
          <>
            {userInfo.isAdmin ? (
              <Link className={pathname === "/dashboard" ? "btn link-secondary" : "btn link-light"} to="/dashboard">
                Dashboard
              </Link>
            ) : null}
            <Link className={pathname === "/profile" ? "btn link-secondary" : "btn link-light"} to="/profile">
              {userInfo.name ? userInfo.name + " | Profile" : "Profile"}
            </Link>
            <Link className="me-4 btn link-light" to="#logout" onClick={logoutHandler}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link className={pathname === "/register" ? "btn link-secondary" : "btn link-light"} to="/register">
              Register
            </Link>
            <Link className={"me-4 " + (pathname === "/login" ? "btn link-secondary" : "btn link-light ")} to="/login">
              Login
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default HomeNavbar;
