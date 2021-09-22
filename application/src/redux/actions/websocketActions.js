import {
  CONNECT_WEBSOCKET,
  MESSAGE_WEBSOCKET,
} from "../constants/websocketTypes";

// WEBSOCKET CONNECT
export const websocketConnect = () => ({
  type: CONNECT_WEBSOCKET,
  payload: null,
});

// WEBSOCKET MESSAGE
export const websocketMessage = (message) => ({
  type: MESSAGE_WEBSOCKET,
  payload: { message },
});
