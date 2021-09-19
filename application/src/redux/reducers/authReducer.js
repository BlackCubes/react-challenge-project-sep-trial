import {
  AUTH_ERROR,
  AUTH_SUCCESS,
  LOGIN,
  LOGOUT,
  SIGNUP,
} from "../actions/types";

const INITIAL_STATE = { email: null, token: null, success: false, error: "" };

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_SUCCESS:
      return {
        ...state,
        success: action.payload.success,
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    case SIGNUP:
      return { ...state };
    case LOGIN:
      return {
        ...state,
        email: action.payload.email,
        token: action.payload.token,
      };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default authReducer;
