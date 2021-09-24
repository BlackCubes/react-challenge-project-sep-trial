import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import ReduxThunk from "redux-thunk";
import { websocketMiddleware } from "./middlewares";
import rootReducer from "./reducers";
import WebsocketAPI from "../api/websocketAPI";

const socket = new WebsocketAPI();

export const store = createStore(
  rootReducer,
  {},
  applyMiddleware(websocketMiddleware(socket), ReduxThunk)
);

export const persistor = persistStore(store);
