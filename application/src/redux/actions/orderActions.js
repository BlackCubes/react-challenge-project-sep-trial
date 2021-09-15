import { ADD_ORDER } from "./types";
import { SERVER_IP } from "../../private";

const finishAddOrder = (_id) => ({
  type: ADD_ORDER,
  payload: { _id },
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
        dispatch(finishAddOrder(res.insertedId));
      }
    });
