import {
  ERROR_AUTH,
  LOADING_AUTH,
  LOGIN_AUTH,
  LOGOUT_AUTH,
  SIGNUP_AUTH,
  SUCCESS_AUTH,
} from "../constants/authTypes";

const INITIAL_STATE = {
  loading: false,
  email: null,
  token: null,
  success: false,
  error: "",
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_AUTH:
      return {
        ...state,
        loading: action.payload.loading,
      };
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
