import { ADD_ORDER } from "../actions/types";

const INITIAL_STATE = {
  orders: [],
};

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
};

export default orderReducer;
