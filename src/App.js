import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import jwt from "jsonwebtoken";
import { logout } from "./actions/userActions";

import PublicRoutes from "./screens/publicScreens";
import AdminRoutes from "./screens/adminScreens";

function App() {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      const decodedToken = jwt.decode(token);
      const dateNow = Date.now() / 1000;
      if (decodedToken.exp < dateNow) {
        dispatch(logout());
      }
    }
  }, [dispatch]);
  return (
    <BrowserRouter>
      <Switch>
        <Route
          path="/dashboard"
          render={() => (userInfo && userInfo.isAdmin ? <AdminRoutes /> : <Redirect to="/login" />)}
        />
        <Route render={() => <PublicRoutes />} />
        <Redirect from="*" to="/404" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
