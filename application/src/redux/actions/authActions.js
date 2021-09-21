import { createLoginUser, createUser } from "../../api/authAPI";
import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN,
  LOGOUT,
  SIGNUP,
} from "../constants/authTypes";
import { headers } from "../../utils";

// AUTH SUCCESS
export const finishAuthSuccess = (success) => ({
  type: AUTH_SUCCESS,
  payload: { success },
});

export const finishAuthError = (error) => ({
  type: AUTH_ERROR,
  payload: { error },
});

// SIGNUP
const finishSignup = () => ({
  type: SIGNUP,
  payload: null,
});

export const signupUser =
  (email, password, password_confirmation) => (dispatch) =>
    createUser(email, password, password_confirmation, headers())
      .then((res) => {
        dispatch(finishSignup());
        dispatch(finishAuthSuccess(res.success));
      })
      .catch((err) => {
        dispatch(finishAuthError(err.error));
        dispatch(finishAuthSuccess(err.success));
      });

// LOGIN
const finishLogin = (email, token) => {
  return {
    type: LOGIN,
    payload: {
      email,
      token,
    },
  };
};

export const loginUser = (email, password) => (dispatch) =>
  createLoginUser(email, password, headers())
    .then((res) => {
      localStorage.setItem("token", JSON.stringify(res.token));
      localStorage.setItem("email", JSON.stringify(res.email));
      dispatch(finishLogin(res.email, res.token));
      dispatch(finishAuthSuccess(res.success));
    })
    .catch((err) => {
      dispatch(finishAuthError(err.error));
      dispatch(finishAuthSuccess(err.success));
    });

// LOGOUT
export const logoutUser = () => {
  if (localStorage.getItem("token")) localStorage.removeItem("token");
  if (localStorage.getItem("email")) localStorage.removeItem("email");

  return {
    type: LOGOUT,
    payload: null,
  };
};
