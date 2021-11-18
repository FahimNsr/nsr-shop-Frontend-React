import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import HomeNavbar from "../../components/HomeNavbar";
import Footer from "../../components/Footer";
import Home from "./Home";
import NotFound from "./NotFound";
import Register from "./Register";
import Login from "./Login";
import ProductDetails from "./ProductDetails";
import Products from "./Products";
import Cart from "./Cart";
import Profile from "./Profile";
import MyOrders from "./MyOrders";
import OrderDetails from "./OrderDetails";
import ShippingAddress from "./ShippingAddress";
import Payment from "./Payment";
import Confirm from "./Confirm";

const PublicRoutes = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  return (
    <>
      <HomeNavbar />
      <div className="mt-5 py-5">
        <Switch>
          <Route path="/confirm" render={() => (userInfo ? <Confirm /> : <Redirect to="/login?redirect=confirm" />)} />
          <Route path="/payment" render={() => (userInfo ? <Payment /> : <Redirect to="/login?redirect=payment" />)} />
          <Route
            path="/shipping"
            render={() => (userInfo ? <ShippingAddress /> : <Redirect to="/login?redirect=shipping" />)}
          />
          <Route
            path="/myorders/:id"
            render={() => (userInfo ? <OrderDetails /> : <Redirect to="/login?redirect=myorders/:id" />)}
          />
          <Route
            path="/myorders"
            render={() => (userInfo ? <MyOrders /> : <Redirect to="/login?redirect=myorders" />)}
          />
          <Route path="/profile" render={() => (userInfo ? <Profile /> : <Redirect to="/login?redirect=profile" />)} />

          <Route path="/cart/:id?" component={Cart} />
          <Route path="/products/name/:name" component={Products} exact />
          <Route
            path="/products/category/:category/name/:name/min/:min/max/:max/order/:order/pageNumber/:pageNumber"
            component={Products}
            exact
          />
          <Route path="/products" component={Products} exact />
          <Route path="/product/:id" component={ProductDetails} exact />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/" component={Home} exact />

          <Route path="/404" component={NotFound} />
          <Redirect from="*" to="/404" />
        </Switch>
      </div>
      <Footer />
    </>
  );
};

export default PublicRoutes;
