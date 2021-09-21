import { createStore, applyMiddleware } from "redux";
import { persistStore } from "redux-persist";
import ReduxThunk from "redux-thunk";
import rootReducer from "./reducers";

export const store = createStore(rootReducer, {}, applyMiddleware(ReduxThunk));

export const persistor = persistStore(store);
