import { finishAddOrder, finishDeleteOrder } from "../actions/orderActions";
import { addSnackbar } from "./snackbarActions";
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
  const finishWebsocketMessage = (data) => {
    dispatch({
      type: MESSAGE_WEBSOCKET,
      result: { message: data.message },
    });

    dispatch(addSnackbar(data.message, "green"));
  };

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

// WEBSOCKET ADD ORDER
export const websocketAddOrder = () => (dispatch) => {
  const finishWebsocketAddOrder = (data) =>
    dispatch(
      finishAddOrder(
        data.order._id,
        data.order.order_item,
        data.order.quantity,
        data.order.ordered_by,
        data.order.createdAt,
        data.order.updatedAt
      )
    );

  return dispatch({
    type: "socket",
    types: [
      RECEIVE_WEBSOCKET,
      RECEIVE_WEBSOCKET_SUCCESS,
      RECEIVE_WEBSOCKET_ERROR,
    ],
    promise: (socket) =>
      socket.on("event://order-add", finishWebsocketAddOrder),
  });
};

// WEBSOCKET DELETE ORDER
export const websocketDeleteOrder = () => (dispatch) => {
  const finishWebsocketDeleteOrder = (data) =>
    dispatch(finishDeleteOrder(data.deletedId));

  return dispatch({
    type: "socket",
    types: [
      RECEIVE_WEBSOCKET,
      RECEIVE_WEBSOCKET_SUCCESS,
      RECEIVE_WEBSOCKET_ERROR,
    ],
    promise: (socket) =>
      socket.on("event://order-delete", finishWebsocketDeleteOrder),
  });
};
