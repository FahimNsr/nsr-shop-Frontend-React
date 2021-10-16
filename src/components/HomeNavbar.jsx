import React from "react";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
    return (
                <nav className="navbar navbar-light bg-white p-3 mb-3">
                    <Link className="navbar-brand" to="/">
                        My Online Shop
                    </Link>
                    <Link className="link-secondary" to="/">Home</Link>
                    <Link className="link-secondary"to="/products">Products</Link>
                    <Link className="link-secondary" to="/cart">Cart</Link>
                    <div className="d-flex justify-content-center">
                        <Link className="link-secondary mx-2" to="/register">Register</Link>
                        /
                        <Link className="link-secondary mx-2" to="/login">Login</Link>
                    </div>
                </nav>
    );
};

export default HomeNavbar;
