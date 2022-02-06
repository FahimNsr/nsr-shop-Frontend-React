import axios from "axios";
import jwt from "jsonwebtoken";
import {
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  USER_REGISTER_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGOUT,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  USER_UPDATE_PROFILE_REQUEST,
  USER_UPDATE_PROFILE_SUCCESS,
  USER_UPDATE_PROFILE_FAIL,
  USER_LIST_REQUEST,
  USER_LIST_SUCCESS,
  USER_LIST_FAIL,
  // USER_UPDATE_SUCCESS,
  // USER_UPDATE_FAIL,
} from "../constants/userConstants";
const localApi = "http://localhost:8000";

export const register = (email, password) => async (dispatch) => {
  dispatch({ type: USER_REGISTER_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(`${localApi}/api/users/register`, {
      email,
      password,
    });
    dispatch({ type: USER_REGISTER_SUCCESS, payload: jwt.decode(data.token) });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: jwt.decode(data.token) });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: USER_REGISTER_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: USER_LOGIN_REQUEST, payload: { email, password } });
  try {
    const { data } = await axios.post(`${localApi}/api/users/login`, { email, password });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: jwt.decode(data.token) });
    localStorage.setItem("token", data.token);
  } catch (error) {
    dispatch({
      type: USER_LOGIN_FAIL,
      payload: error.response && error.response.data.message ? error.response.data.message : error.message,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("token");
  localStorage.removeItem("cartItems");
  localStorage.removeItem("shippingAddress");
  dispatch({ type: USER_LOGOUT });
  document.location.href = "/";
};

export const detailsUser = (userId) => async (dispatch) => {
  dispatch({ type: USER_DETAILS_REQUEST, payload: userId });
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.get(`${localApi}/api/users/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_DETAILS_FAIL, payload: message });
  }
};

export const updateUserProfile = (user) => async (dispatch) => {
  dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
  const token = localStorage.getItem("token");
  try {
    const { data } = await axios.put(`${localApi}/api/users/profile`, user, {
      headers: { Authorization: `Bearer ${token}` },
    });
    dispatch({ type: USER_UPDATE_PROFILE_SUCCESS, payload: jwt.decode(data.token) });
    dispatch({ type: USER_LOGIN_SUCCESS, payload: jwt.decode(data.token) });
    localStorage.setItem("token", data.token);
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_UPDATE_PROFILE_FAIL, payload: message });
  }
};

export const listUsers = () => async (dispatch) => {
  dispatch({ type: USER_LIST_REQUEST });
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`${localApi}/api/users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: USER_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message = error.response && error.response.data.message ? error.response.data.message : error.message;
    dispatch({ type: USER_LIST_FAIL, payload: message });
  }
};

// export const updateUser = (user) => async (dispatch) => {
//   dispatch({ type: USER_UPDATE_PROFILE_REQUEST, payload: user });
// const token = localStorage.getItem("token")
//   try {
//     const { data } = await axios.put(`/api/users/${user._id}`, user, {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
//   } catch (error) {
//     const message = error.response && error.response.data.message ? error.response.data.message : error.message;
//     dispatch({ type: USER_UPDATE_FAIL, payload: message });
//   }
// };
