import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomeNavbar from "../../components/HomeNavbar";
import HomePage from "./HomePage";
import Register from "./Register";
import Login from "./Login";
import Products from "./Products";
import Cart from "./Cart";

const Home = () => {
    return (
        <>
            <HomeNavbar />
            <Switch>
                <Route path="/cart" component={Cart} />
                <Route path="/products" component={Products} />
                <Route path="/login" component={Login} />
                <Route path="/register" component={Register} />
                <Route exact path="/" component={HomePage} />
                <Redirect from="*" to="/" />
            </Switch>
        </>
    );
};

export default Home;
