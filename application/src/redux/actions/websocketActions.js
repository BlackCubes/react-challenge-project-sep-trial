import {
  CONNECT_WEBSOCKET,
  CONNECT_WEBSOCKET_ERROR,
  CONNECT_WEBSOCKET_SUCCESS,
  MESSAGE_WEBSOCKET,
} from "../constants/websocketTypes";

// WEBSOCKET CONNECT
export const websocketConnect = () => ({
  type: "socket",
  types: [
    CONNECT_WEBSOCKET,
    CONNECT_WEBSOCKET_SUCCESS,
    CONNECT_WEBSOCKET_ERROR,
  ],
  promise: (socket) => socket.connect(),
});

// WEBSOCKET MESSAGE
export const websocketMessage = (message) => ({
  type: MESSAGE_WEBSOCKET,
  payload: { message },
});
