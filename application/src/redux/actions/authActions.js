import { createLoginUser, createUser } from "../../api/authAPI";
import {
  ERROR_AUTH,
  LOADING_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  SIGNUP_AUTH,
  SUCCESS_AUTH,
} from "../constants/authTypes";
import { addSnackbar } from "./snackbarActions";
import { headers } from "../../utils";

// AUTH LOADING
export const finishAuthLoading = (loading) => ({
  type: LOADING_AUTH,
  payload: { loading },
});

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
  (email, password, password_confirmation) => (dispatch) => {
    dispatch(finishAuthLoading(true));

    return createUser(email, password, password_confirmation, headers())
      .then((res) => {
        dispatch(finishSignup());
        dispatch(finishAuthSuccess(res.success));
        dispatch(addSnackbar("Signup successful.", "green"));
      })
      .catch((err) => {
        dispatch(finishAuthError(err.error));
        dispatch(finishAuthSuccess(err.success));
        dispatch(addSnackbar(err.error, "red"));
      })
      .finally(() => dispatch(finishAuthLoading(false)));
  };

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

export const loginUser = (email, password) => (dispatch) => {
  dispatch(finishAuthLoading(true));

  return createLoginUser(email, password, headers())
    .then((res) => {
      dispatch(finishLogin(res.email, res.token));
      dispatch(finishAuthSuccess(res.success));
      dispatch(addSnackbar("Login success.", "green"));
    })
    .catch((err) => {
      dispatch(finishAuthError(err.error));
      dispatch(finishAuthSuccess(err.success));
      dispatch(addSnackbar(err.error, "red"));
    })
    .finally(() => dispatch(finishAuthLoading(false)));
};

// LOGOUT
export const logoutUser = () => (dispatch) => {
  dispatch({
    type: LOGOUT_AUTH,
    payload: null,
  });

  dispatch(addSnackbar("See you space cowboy...", "green"));
};
