import {
  CONNECT_WEBSOCKET,
  CONNECT_WEBSOCKET_ERROR,
  CONNECT_WEBSOCKET_SUCCESS,
  MESSAGE_WEBSOCKET,
  RECEIVE_WEBSOCKET,
  RECEIVE_WEBSOCKET_ERROR,
  RECEIVE_WEBSOCKET_SUCCESS,
} from "../constants/websocketTypes";

const INITIAL_STATE = {
  loading: false,
  loaded: false,
  socketId: "",
  message: "",
  error: "",
};

const websocketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_WEBSOCKET:
      return {
        ...state,
        loading: true,
      };
    case CONNECT_WEBSOCKET_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        socketId: action.result.socketId,
        error: "",
      };
    case CONNECT_WEBSOCKET_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        socketId: "",
        error: action.error,
      };
    case RECEIVE_WEBSOCKET:
      return {
        ...state,
        loading: true,
      };
    case RECEIVE_WEBSOCKET_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        error: "",
      };
    case RECEIVE_WEBSOCKET_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error,
      };
    case MESSAGE_WEBSOCKET:
      return {
        ...state,
        message: action.result.message,
      };
    default:
      return state;
  }
};

export default websocketReducer;
