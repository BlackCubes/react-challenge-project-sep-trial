import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import TempReducer from "./tempReducer";
import authReducer from "./authReducer";
import orderReducer from "./orderReducer";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  temp: TempReducer,
  auth: authReducer,
  order: orderReducer,
});

export default persistReducer(persistConfig, rootReducer);
