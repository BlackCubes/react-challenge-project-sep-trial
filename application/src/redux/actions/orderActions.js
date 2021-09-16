import { ADD_ORDER, GET_CURRENT_ORDERS } from "./types";
import { SERVER_IP } from "../../private";

// GET CURRENT ORDERS
const finishGetCurrentOrders = (orders) => ({
  type: GET_CURRENT_ORDERS,
  payload: { orders },
});

export const getCurrentOrders = () => (dispatch) =>
  fetch(`${SERVER_IP}/api/current-orders`, {
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
  fetch(`${SERVER_IP}/api/add-order`, {
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
