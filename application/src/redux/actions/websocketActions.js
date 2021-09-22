import {
  CONNECT_WEBSOCKET,
  CONNECT_WEBSOCKET_ERROR,
  CONNECT_WEBSOCKET_SUCCESS,
  MESSAGE_WEBSOCKET,
  RECEIVE_WEBSOCKET,
  RECEIVE_WEBSOCKET_ERROR,
  RECEIVE_WEBSOCKET_SUCCESS,
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
export const websocketMessage = () => (dispatch) => {
  const finishWebsocketMessage = (data) =>
    dispatch({
      type: MESSAGE_WEBSOCKET,
      result: { message: data.message },
    });

  return dispatch({
    type: "socket",
    types: [
      RECEIVE_WEBSOCKET,
      RECEIVE_WEBSOCKET_SUCCESS,
      RECEIVE_WEBSOCKET_ERROR,
    ],
    promise: (socket) =>
      socket.on("event://socket-message", finishWebsocketMessage),
  });
};
