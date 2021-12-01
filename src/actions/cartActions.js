import axios from "axios";
import {
  CART_ADD_ITEM,
  CART_UPDATE,
  CART_REMOVE_ITEM,
  CART_SAVE_SHIPPING_ADDRESS,
  CART_SAVE_PAYMENT_METHOD,
  CART_ADD_ITEM_FAIL,
} from "../constants/cartConstants";
const localApi = "http://localhost:8000";

export const addToCart = (productId, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`${localApi}/api/products/${productId}`);
  if (qty > data.countInStock) {
    dispatch({
      type: CART_ADD_ITEM_FAIL,
      payload: `Can't Add To Cart. ${data.name} does not exist more than ${data.countInStock} in stock`,
    });
  } else {
    dispatch({
      type: CART_ADD_ITEM,
      payload: {
        name: data.name,
        imageName: data.imageName,
        price: data.price,
        countInStock: data.countInStock,
        product: data._id,
        seller: data.seller,
        qty,
      },
    });
    localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
  }
};

export const updateCart = () => async (dispatch, getState) => {
  let cartItems = getState().cart.cartItems;
  const items = [];
  let item = {};
  const messages = [];
  for (let index = 0; index < cartItems.length; index++) {
    const id = cartItems[index].product;
    const qty = cartItems[index].qty;
    const price = cartItems[index].price;
    const { data } = await axios.get(`${localApi}/api/products/${id}`);
    item = {
      name: data.name,
      imageName: data.imageName,
      price: data.price,
      countInStock: data.countInStock,
      product: data._id,
      seller: data.seller,
    };
    if (qty > data.countInStock) {
      messages.push(`There is only ${data.countInStock} ${data.name} available for You.`);
      item.qty = data.countInStock;
    } else {
      item.qty = qty;
    }
    if (price !== data.price) {
      messages.push(`The price of ${data.name} changed from $${price} to $${data.price}.`);
    }
    items[index] = item;
  }
  if (JSON.stringify(items) !== JSON.stringify(cartItems)) {
    dispatch({ type: CART_UPDATE, messages, items });
  }
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (productId) => (dispatch, getState) => {
  dispatch({ type: CART_REMOVE_ITEM, payload: productId });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_SHIPPING_ADDRESS, payload: data });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};
export const savePaymentMethod = (data) => (dispatch) => {
  dispatch({ type: CART_SAVE_PAYMENT_METHOD, payload: data });
};
