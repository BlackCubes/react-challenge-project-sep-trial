import React, { Component } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import Snackbar from "./components/snackbar";
import AppRouter from "./router/appRouter";
import { persistor, store } from "./redux/store";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <AppRouter />

          <Snackbar />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
