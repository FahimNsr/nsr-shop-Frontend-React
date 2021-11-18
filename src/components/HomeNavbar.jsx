import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../actions/userActions";
import SearchBox from "../components/SearchBox";

const HomeNavbar = () => {
  const redirect = window.location.search ? window.location.search.split("=")[1] : "/";
  const { pathname } = useLocation();
  const { userInfo } = useSelector((state) => state.userLogin);
  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;
  const cartBadge = cartItems ? cartItems.map((item) => item.qty).reduce((prev, curr) => prev + curr, 0) : 0;
  const dispatch = useDispatch();
  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <div className=" navbar bg-dark py-2 rounded-bottom fixed-top">
      <div className="col-auto ms-3">
        <Link className="navbar-brand text-light opacity-75" to="/">
          NSR
        </Link>
        <Link className={pathname === "/products" ? "btn link-secondary" : "btn link-light"} to="/products">
          Products
        </Link>
      </div>
      <div className="col col-lg-3 col-xl-3 col-md-4 col-sm-5 mx-1">
        <SearchBox />
      </div>
      <div className="col-auto mx-1 d-flex justify-content-between">
        <Link className={pathname === "/cart" ? "btn link-secondary" : "btn link-light"} to="/cart">
          Cart {cartBadge > 0 && <span className="badge rounded-pill bg-success">{cartBadge}</span>}
        </Link>
        {userInfo ? (
          <>
            {userInfo.isAdmin ? (
              <Link className={pathname === "/dashboard" ? "btn link-secondary" : "btn link-light"} to="/dashboard">
                Dashboard
              </Link>
            ) : null}
            <Link className={pathname === "/profile" ? "btn link-secondary" : "btn link-light"} to="/profile">
              {userInfo.name ? userInfo.name + "|Profile" : "Profile"}
            </Link>
            <Link className="me-2 btn link-light" to="#logout" onClick={logoutHandler}>
              Logout
            </Link>
          </>
        ) : (
          <>
            <Link
              className={pathname === "/register" ? "btn link-secondary" : "btn link-light"}
              to={`/register?redirect=${redirect}`}
            >
              Register
            </Link>
            <Link
              className={"me-2 " + (pathname === "/login" ? "btn link-secondary" : "btn link-light ")}
              to={`/login?redirect=${redirect}`}
            >
              Login
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HomeNavbar;
