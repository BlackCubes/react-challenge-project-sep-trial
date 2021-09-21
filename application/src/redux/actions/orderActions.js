import {
  createOrder,
  getCurrentOrders,
  removeOrder,
  updateOrder,
} from "../../api/orderAPI";
import {
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  GET_CURRENT_ORDERS,
} from "../constants/orderTypes";
import { headers } from "../../utils";

// GET CURRENT ORDERS
const finishCurrentOrders = (orders) => ({
  type: GET_CURRENT_ORDERS,
  payload: { orders },
});

export const currentOrders = () => (dispatch) => {
  return getCurrentOrders(headers()).then((res) =>
    dispatch(finishCurrentOrders(res.data.orders))
  );
};

// ADD ORDER
const finishAddOrder = (
  _id,
  order_item,
  quantity,
  ordered_by,
  createdAt,
  updatedAt
) => ({
  type: ADD_ORDER,
  payload: {
    _id,
    order_item,
    quantity,
    ordered_by,
    createdAt,
    updatedAt,
  },
});

export const addOrder = (order_item, quantity, ordered_by) => (dispatch) => {
  return createOrder(order_item, quantity, ordered_by, headers()).then(
    (res) => {
      const isoDate = new Date().toISOString();
      dispatch(
        finishAddOrder(
          res.data.insertedId,
          order_item,
          quantity,
          ordered_by,
          isoDate,
          isoDate
        )
      );
    }
  );
};

// EDIT ORDER
const finishEditOrder = (_id, order_item, quantity, ordered_by, updatedAt) => ({
  type: EDIT_ORDER,
  payload: {
    _id,
    order_item,
    quantity,
    ordered_by,
    updatedAt,
  },
});

export const editOrder =
  (id, order_item, quantity, ordered_by) => (dispatch) => {
    return updateOrder(id, order_item, quantity, ordered_by, headers()).then(
      (res) => {
        const updatedAt = new Date().toISOString();
        dispatch(
          finishEditOrder(id, order_item, quantity, ordered_by, updatedAt)
        );
      }
    );
  };

// DELETE ORDER
const finishDeleteOrder = (_id) => ({
  type: DELETE_ORDER,
  payload: { _id },
});

export const deleteOrder = (id) => (dispatch) => {
  return removeOrder(id, headers()).then((res) =>
    dispatch(finishDeleteOrder(id))
  );
};
