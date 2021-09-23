import {
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  ERROR_ORDER,
  GET_CURRENT_ORDERS,
  LIVE_ORDER,
  LOADING_ORDER,
  SUCCESS_ORDER,
} from "../constants/orderTypes";

const INITIAL_STATE = {
  loading: false,
  orders: [],
  success: false,
  error: "",
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LOADING_ORDER:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case SUCCESS_ORDER:
      return {
        ...state,
        success: action.payload.success,
      };
    case ERROR_ORDER:
      return {
        ...state,
        error: action.payload.error,
      };
    case GET_CURRENT_ORDERS:
      return {
        ...state,
        orders: action.payload.orders,
      };
    case ADD_ORDER:
      const newOrder = {
        _id: action.payload["_id"],
        order_item: action.payload.order_item,
        quantity: action.payload.quantity,
        ordered_by: action.payload.ordered_by,
        createdAt: action.payload.createdAt,
        updatedAt: action.payload.updatedAt,
      };

      return {
        ...state,
        orders: [...state.orders, newOrder],
      };
    case EDIT_ORDER:
      const updatedOrders = state.orders.map((order) => {
        const clonedOrder = { ...order };

        if (clonedOrder["_id"] === action.payload["_id"]) {
          clonedOrder.order_item = action.payload.order_item;
          clonedOrder.quantity = action.payload.quantity;
          clonedOrder.ordered_by = action.payload.ordered_by;
          clonedOrder.updatedAt = action.payload.updatedAt;
        }

        return clonedOrder;
      });

      return {
        ...state,
        orders: updatedOrders,
      };
    case DELETE_ORDER:
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order._id !== action.payload._id
        ),
      };
    case LIVE_ORDER:
      return { ...state };
    default:
      return state;
  }
};

export default orderReducer;
