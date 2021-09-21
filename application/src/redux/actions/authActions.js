import { createLoginUser, createUser } from "../../api/authAPI";
import {
  ERROR_AUTH,
  SUCCESS_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  SIGNUP_AUTH,
} from "../constants/authTypes";
import { headers } from "../../utils";

// AUTH SUCCESS
export const finishAuthSuccess = (success) => ({
  type: SUCCESS_AUTH,
  payload: { success },
});

export const finishAuthError = (error) => ({
  type: ERROR_AUTH,
  payload: { error },
});

// SIGNUP
const finishSignup = () => ({
  type: SIGNUP_AUTH,
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
    type: LOGIN_AUTH,
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
    type: LOGOUT_AUTH,
    payload: null,
  };
};
