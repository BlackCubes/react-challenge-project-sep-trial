import { LOGIN, LOGOUT, SIGNUP } from "./types";
import { SERVER_IP } from "../../private";

// SIGNUP
const finishSignup = (error) => ({
  type: SIGNUP,
  payload: { error },
});

export const signupUser =
  (email, password, password_confirmation) => (dispatch) =>
    fetch(`${SERVER_IP}/api/signup`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
        password_confirmation,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        let error = "";

        if (!res.success) {
          error = res.error;
        }

        dispatch(finishSignup(error));
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

export const loginUser = (email, password) => {
  return (dispatch) => {
    fetch(`${SERVER_IP}/api/login`, {
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          dispatch(finishLogin(response.email, response.token));
        }
      });
  };
};

// LOGOUT
export const logoutUser = () => {
  return {
    type: LOGOUT,
    payload: null,
  };
};
