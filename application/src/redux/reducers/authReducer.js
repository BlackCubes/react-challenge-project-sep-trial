import {
  ERROR_AUTH,
  SUCCESS_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  SIGNUP_AUTH,
} from "../constants/authTypes";

const INITIAL_STATE = { email: null, token: null, success: false, error: "" };

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SUCCESS_AUTH:
      return {
        ...state,
        success: action.payload.success,
      };
    case ERROR_AUTH:
      return {
        ...state,
        error: action.payload.error,
      };
    case SIGNUP_AUTH:
      return { ...state };
    case LOGIN_AUTH:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
      };
    case LOGOUT_AUTH:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default authReducer;
