import {
  ADD_ORDER,
  DELETE_ORDER,
  EDIT_ORDER,
  GET_CURRENT_ORDERS,
} from "../actions/types";

const INITIAL_STATE = {
  orders: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default orderReducer;
