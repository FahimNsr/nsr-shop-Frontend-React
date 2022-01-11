import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { logout } from "../actions/userActions";
import SearchBox from "../components/SearchBox";

const HomeNavbar = () => {
  const { t, i18n } = useTranslation();
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
          {t("nav.products")}
        </Link>
      </div>
      <div className="col col-lg-3 col-xl-3 col-md-4 col-sm-5 mx-1">
        <SearchBox />
      </div>
      <div className="col-auto mx-1 d-flex justify-content-between">
        <Link className={pathname === "/cart" ? "btn link-secondary" : "btn link-light"} to="/cart">
          {t("nav.cart")} {cartBadge > 0 && <span className="badge rounded-pill bg-success">{cartBadge}</span>}
        </Link>
        {userInfo ? (
          <>
            {userInfo.isAdmin ? (
              <Link className={pathname === "/dashboard" ? "btn link-secondary" : "btn link-light"} to="/dashboard">
                Dash
              </Link>
            ) : null}
            <div className="btn">
              <span className="mx-2">
                <Link
                  className={"text-decoration-none " + (pathname === "/profile" ? " text-secondary" : " text-light")}
                  to="/profile"
                >
                  {userInfo.name ? userInfo.name + `|${t("nav.profile")}` : `${t("nav.profile")}`}
                </Link>
              </span>
              <span>
                <Link className="text-decoration-none text-light " to="#logout" onClick={logoutHandler}>
                  {t("nav.logout")}
                </Link>
              </span>
            </div>
          </>
        ) : (
          <div className="btn">
            <span className="mx-2">
              <Link
                className={"text-decoration-none " + (pathname === "/register" ? " text-secondary" : " text-light")}
                to={`/register?redirect=${redirect}`}
              >
                {t("nav.register")}
              </Link>
            </span>
            <span>
              <Link
                className={"text-decoration-none " + (pathname === "/login" ? " text-secondary" : " text-light ")}
                to={`/login?redirect=${redirect}`}
              >
                {t("nav.login")}
              </Link>
            </span>
          </div>
        )}
        <div className="btn">
          <span
            className={i18n.resolvedLanguage === "en" ? "link-secondary" : "link-light"}
            onClick={() => i18n.changeLanguage("en")}
          >
            EN{" "}
          </span>
          <span
            className={i18n.resolvedLanguage === "en" ? "link-light" : "link-secondary"}
            onClick={() => i18n.changeLanguage("de")}
          >
            DE
          </span>
        </div>
      </div>
    </div>
  );
};

export default HomeNavbar;
