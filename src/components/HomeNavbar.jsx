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
    <div className=" navbar bg-dark py-2 rounded-bottom fixed-top">
      <div className="col-auto">
        <Link className="navbar-brand text-light m-2 opacity-75" to="/">
          NSR
        </Link>
        <Link className={pathname === "/products" ? "btn link-secondary" : "btn link-light"} to="/products">
          Products
        </Link>
      </div>
      <div className="col col-lg-3 col-xl-3 col-md-4 mx-1">
        <SearchBox />
      </div>
      <div className="col-auto mx-1 d-flex justify-content-end">
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
    </div>
  );
};

export default HomeNavbar;
