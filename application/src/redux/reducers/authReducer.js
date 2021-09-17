import { LOGIN, LOGOUT, SIGNUP } from "../actions/types";

const INITIAL_STATE = { email: null, token: null, success: false, error: "" };

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNUP:
      return {
        ...state,
        success: action.payload.success,
        error: action.payload.error,
      };
    case LOGIN:
      return {
        ...state,
        email: action.payload.login,
        token: action.payload.token,
      };
    case LOGOUT:
      return { ...state, ...INITIAL_STATE };
    default:
      return state;
  }
};

export default authReducer;
