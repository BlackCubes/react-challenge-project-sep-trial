import { v4 as uuidv4 } from "uuid";
import { ADD_SNACKBAR, DELETE_SNACKBAR } from "../constants/snackbarTypes";

// ADD SNACKBAR MESSAGES
export const addSnackbar = (content, color) => ({
  type: ADD_SNACKBAR,
  payload: { id: uuidv4(), content, color },
});

// DELETE SNACKBAR MESSAGES
export const deleteSnackbar = (id) => ({
  type: DELETE_SNACKBAR,
  payload: { id },
});
