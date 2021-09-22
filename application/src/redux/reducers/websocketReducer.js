import {
  CONNECT_WEBSOCKET,
  MESSAGE_WEBSOCKET,
} from "../constants/websocketTypes";

const INITIAL_STATE = { socketId: "", message: "" };

const websocketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CONNECT_WEBSOCKET:
      return {
        ...state,
        socketId: action.payload.socketId,
      };
    case MESSAGE_WEBSOCKET:
      return {
        ...state,
        message: action.payload.message,
      };
    default:
      return state;
  }
};

export default websocketReducer;
