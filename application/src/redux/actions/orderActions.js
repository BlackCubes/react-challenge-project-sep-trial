import {
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  GET_CURRENT_ORDERS,
} from "./types";
import { SERVER_IP } from "../../private";

// GET CURRENT ORDERS
const finishGetCurrentOrders = (orders) => ({
  type: GET_CURRENT_ORDERS,
  payload: { orders },
});

export const getCurrentOrders = () => (dispatch) =>
  fetch(`${SERVER_IP}/api/order/current-orders`, {
    method: "GET",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch(finishGetCurrentOrders(res.orders));
      }
    });

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

export const addOrder = (order_item, quantity, ordered_by) => (dispatch) =>
  fetch(`${SERVER_IP}/api/order/add-order`, {
    method: "POST",
    body: JSON.stringify({
      order_item,
      quantity,
      ordered_by,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        const isoDate = new Date().toISOString();

        dispatch(
          finishAddOrder(
            res.insertedId,
            order_item,
            quantity,
            ordered_by,
            isoDate,
            isoDate
          )
        );
      }
    });

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

export const editOrder = (id, order_item, quantity, ordered_by) => (dispatch) =>
  fetch(`${SERVER_IP}/api/order/edit-order/${id}`, {
    method: "PATCH",
    body: JSON.stringify({
      order_item,
      quantity,
      ordered_by,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        const updatedAt = new Date().toISOString();

        dispatch(
          finishEditOrder(id, order_item, quantity, ordered_by, updatedAt)
        );
      }
    });

// DELETE ORDER
const finishDeleteOrder = (_id) => ({
  type: DELETE_ORDER,
  payload: { _id },
});

export const deleteOrder = (id) => (dispatch) =>
  fetch(`${SERVER_IP}/api/order/delete-order/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((res) => {
      if (res.success) {
        dispatch(finishDeleteOrder(id));
      }
    });
