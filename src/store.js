import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./reducers";
import jwt from "jsonwebtoken";

const token = localStorage.getItem("token");
const initialState = {
  userLogin: {
    userInfo: token ? jwt.decode(token) : null,
  },
  cart: {
    cartItems: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
    shippingAddress: localStorage.getItem("shippingAddress") ? JSON.parse(localStorage.getItem("shippingAddress")) : {},
    paymentMethod: "PayPal",
  },
};

const middlewares = [thunk];

export const store = createStore(rootReducer, initialState, composeWithDevTools(applyMiddleware(...middlewares)));
