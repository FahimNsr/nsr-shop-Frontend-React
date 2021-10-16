import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import HomeNavbar from "../../components/HomeNavbar";
import HomePage from "./HomePage";
import Register from "./Register";
import Login from "./Login";
import Logout from "./Logout";
import Products from "./Products";
import Cart from "./Cart";

const Home = () => {
    return (
        <>
            <HomeNavbar />
            <div className="p4">
                <div className=" container">
                    <Switch>
                        <Route path="/cart" component={Cart} />
                        <Route path="/products" component={Products} />
                        <Route path="/logout" component={Logout} />
                        <Route path="/login" component={Login} />
                        <Route path="/register" component={Register} />
                        <Route exact path="/" component={HomePage} />
                        <Redirect from="*" to="/" />
                    </Switch>
                </div>
            </div>
        </>
    );
};

export default Home;
