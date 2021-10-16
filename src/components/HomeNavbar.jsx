import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { decodeToken } from "../helpers";
import { userAction } from "../redux/action";

const HomeNavbar = ({ history }) => {
    let { pathname } = useLocation();
    const dispatch = useDispatch;
    const { status, userInfo } = useSelector((state) => state.authentication);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const decodedToken = decodeToken(token);
            const dateNow = Date.now() / 1000;
            if (decodedToken.exp < dateNow) {
                history.replace("/");
                dispatch(userAction.logout());
            }
        }
    }, [dispatch, history]);

    return (
        <nav className="navbar navbar-light bg-dark p-2 mb-3">
            <Link className="navbar-brand text-light" to="/">
                My Online Shop
            </Link>
            <Link className={pathname === "/" ? "btn link-secondary" : "btn link-light"} to="/">
                Home
            </Link>
            <Link className={pathname === "/products" ? "btn link-secondary" : "btn link-light"} to="/products">
                Products
            </Link>
            <Link className={pathname === "/cart" ? "btn link-secondary" : "btn link-light"} to="/cart">
                Cart
            </Link>
            {status ? (
                <div className="d-flex justify-content-end ">
                    {userInfo.admin ? (
                        <Link className={pathname === "/dashboard" ? "btn link-secondary" : "btn link-light"} to="/dashboard">
                            Dashboard
                        </Link>
                    ) : null}
                    <Link className={pathname === "/profile" ? "btn link-secondary" : "btn link-light"} to="/profile">
                        {userInfo.firstname} | Profile
                    </Link>
                    <Link className="btn link-light" to="/logout">
                        Logout
                    </Link>
                </div>
            ) : (
                <div className="d-flex justify-content-end ">
                    <Link className={pathname === "/register" ? "btn link-secondary" : "btn link-light"} to="/register">
                        Register
                    </Link>
                    <Link className={pathname === "/login" ? "btn link-secondary" : "btn link-light"} to="/login">
                        Login
                    </Link>
                </div>
            )}
        </nav>
    );
};

export default HomeNavbar;
