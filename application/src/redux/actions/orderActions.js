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
  ERROR_ORDER,
  GET_CURRENT_ORDERS,
  LOADING_ORDER,
  SUCCESS_ORDER,
} from "../constants/orderTypes";
import { headers } from "../../utils";

// ORDER LOADING
export const finishOrderLoading = (loading) => ({
  type: LOADING_ORDER,
  payload: { loading },
});

// ORDER SUCCESS
export const finishOrderSuccess = (success) => ({
  type: SUCCESS_ORDER,
  payload: { success },
});

// ORDER ERROR
export const finishOrderError = (error) => ({
  type: ERROR_ORDER,
  payload: { error },
});

// GET CURRENT ORDERS
const finishCurrentOrders = (orders) => ({
  type: GET_CURRENT_ORDERS,
  payload: { orders },
});

export const currentOrders = () => (dispatch) => {
  dispatch(finishOrderLoading(true));

  return getCurrentOrders(headers())
    .then((res) => {
      dispatch(finishCurrentOrders(res.orders));
      dispatch(finishOrderSuccess(res.success));
    })
    .catch((err) => {
      dispatch(finishOrderError(err.error));
      dispatch(finishOrderSuccess(err.success));
    })
    .finally(() => dispatch(finishOrderLoading(false)));
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
  dispatch(finishOrderLoading(true));

  return createOrder(order_item, quantity, ordered_by, headers())
    .then((res) => {
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
      dispatch(finishOrderSuccess(res.success));
    })
    .catch((err) => {
      dispatch(finishOrderError(err.error));
      dispatch(finishOrderSuccess(err.success));
    })
    .finally(() => dispatch(finishOrderLoading(false)));
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
    dispatch(finishOrderLoading(true));

    return updateOrder(id, order_item, quantity, ordered_by, headers())
      .then((res) => {
        const updatedAt = new Date().toISOString();
        dispatch(
          finishEditOrder(id, order_item, quantity, ordered_by, updatedAt)
        );
        dispatch(finishOrderSuccess(res.success));
      })
      .catch((err) => {
        dispatch(finishOrderError(err.error));
        dispatch(finishOrderSuccess(err.success));
      })
      .finally(() => dispatch(finishOrderLoading(false)));
  };

// DELETE ORDER
const finishDeleteOrder = (_id) => ({
  type: DELETE_ORDER,
  payload: { _id },
});

export const deleteOrder = (id) => (dispatch) => {
  dispatch(finishOrderLoading(true));

  return removeOrder(id, headers())
    .then((res) => {
      dispatch(finishDeleteOrder(id));
      dispatch(finishOrderSuccess(res.success));
    })
    .catch((err) => {
      dispatch(finishOrderError(err.error));
      dispatch(finishOrderSuccess(err.success));
    })
    .finally(() => dispatch(finishOrderLoading(false)));
};
