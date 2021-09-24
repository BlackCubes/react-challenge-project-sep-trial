import { ADD_SNACKBAR, DELETE_SNACKBAR } from "../constants/snackbarTypes";

const INITIAL_STATE = {
  messages: [],
  totalCount: 0,
  // An initial of 1 due to when the message first appears.
  messageReadCount: 1,
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
        totalCount: newCount,
      };
    case DELETE_SNACKBAR:
      const updatedMessages = state.messages.length
        ? state.messages.filter((message) => message.id !== action.payload.id)
        : state.messages;

      // The added 1 is the initial case when the message first appears and thus the
      // user has "read" it.
      const updateReadCount = updatedMessages.length
        ? state.totalCount - updatedMessages.length + 1
        : 1;

      return {
        ...state,
        messages: updatedMessages,
        messageReadCount: updateReadCount,
      };
    default:
      return { ...state };
  }
};

export default snackbarReducer;
