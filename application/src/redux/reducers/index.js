import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import TempReducer from "./tempReducer";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";
import snackbarReducer from "./snackbarReducer";
import websocketReducer from "./websocketReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  temp: TempReducer,
  auth: authReducer,
  order: orderReducer,
  snackbar: snackbarReducer,
  websocket: websocketReducer,
});

export default persistReducer(persistConfig, rootReducer);
