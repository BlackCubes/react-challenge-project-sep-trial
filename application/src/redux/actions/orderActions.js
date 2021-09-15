import { ADD_ORDER } from "./types";
import { SERVER_IP } from "../../private";

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
