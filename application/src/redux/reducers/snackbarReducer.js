import { ADD_SNACKBAR, DELETE_SNACKBAR } from "../constants/snackbarTypes";

const INITIAL_STATE = {
  messages: [],
  count: 0,
};

const snackbarReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_SNACKBAR:
      const newMessage = {
        id: action.payload.id,
        content: action.payload.content,
        color: action.payload.color,
      };

      const newMessages = [...state.messages, newMessage];
      const newCount = newMessages.length;

      return {
        ...state,
        messages: newMessages,
        count: newCount,
      };
    case DELETE_SNACKBAR:
      const updatedMessages = state.messages.length
        ? state.messages.filter((message) => message.id !== action.payload.id)
        : state.messages;

      const updatedCount = updatedMessages.length;

      return {
        ...state,
        messages: updatedMessages,
        count: updatedCount,
      };
    default:
      return { ...state };
  }
};

export default snackbarReducer;
