import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import DashNavbar from "../../components/DashNavbar";
import DashPage from "./DashPage";
import UsersList from "./UsersList";
import ProductsList from "./ProductsList";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const AdminRoutes = () => {
  return (
    <>
      <DashNavbar />
      <div className=" container">
        <Switch>
          <Route path="/dashboard/product/:id" component={EditProduct} />
          <Route path="/dashboard/addProduct" component={AddProduct} />
          <Route path="/dashboard/products/pageNumber/:pageNumber" component={ProductsList} exact />
          <Route path="/dashboard/products" component={ProductsList} exact />
          <Route path="/dashboard/users" component={UsersList} exact />
          <Route path="/dashboard" component={DashPage} exact />
          <Redirect from="*" to="/404" />
        </Switch>
      </div>
    </>
  );
};

export default AdminRoutes;
