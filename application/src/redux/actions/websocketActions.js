import {
  CONNECT_WEBSOCKET,
  MESSAGE_WEBSOCKET,
} from "../constants/websocketTypes";

// WEBSOCKET CONNECT
export const websocketConnect = (socketId) => ({
  type: CONNECT_WEBSOCKET,
  payload: { socketId },
});

// WEBSOCKET MESSAGE
export const websocketMessage = (message) => ({
  type: MESSAGE_WEBSOCKET,
  payload: { message },
});
