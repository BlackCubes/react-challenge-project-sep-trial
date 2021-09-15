import { ADD_ORDER } from "../actions/types";

const INITIAL_STATE = [
  {
    _id: "",
    order_item: "",
    quantity: 0,
    ordered_by: "Unknown!",
    createdAt: "",
    updatedAt: "",
  },
];

const orderReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_ORDER:
      return {
        ...state,
        _id: action.payload["_id"],
      };
    default:
      return state;
  }
};

export default orderReducer;
