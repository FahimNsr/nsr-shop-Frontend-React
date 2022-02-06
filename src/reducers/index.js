import { combineReducers } from "redux";
import {
  userRegisterReducer,
  userLoginReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  // userUpdateReducer,
  userListReducer,
} from "./userReducers";

import {
  productListReducer,
  productCreateReducer,
  productDetailsReducer,
  productUpdateReducer,
  productDeleteReducer,
  CategoryListReducer,
} from "./productReducers";

import {
  orderCreateReducer,
  orderMineListReducer,
  orderDetailsReducer,
  // orderListReducer,
  // orderDeleteReducer,
  // orderDeliverReducer,
  // orderSummaryReducer,
} from "./orderReducers";

import { cartReducer } from "./cartReducers";

const rootReducer = combineReducers({
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  // userUpdate: userUpdateReducer,
  userList: userListReducer,

  productList: productListReducer,
  productCreate: productCreateReducer,
  productDetails: productDetailsReducer,
  productUpdate: productUpdateReducer,
  productDelete: productDeleteReducer,
  categoryList: CategoryListReducer,

  cart: cartReducer,

  orderCreate: orderCreateReducer,
  orderMineList: orderMineListReducer,
  orderDetails: orderDetailsReducer,
  // orderList: orderListReducer,
  // orderDelete: orderDeleteReducer,
  // orderDeliver: orderDeliverReducer,
  // orderSummary: orderSummaryReducer,
});

export default rootReducer;
