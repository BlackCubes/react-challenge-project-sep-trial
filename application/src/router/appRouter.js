import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import { Main, Login, OrderForm, Signup, ViewOrdersHook } from "../components";

const AppRouter = (props) => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Main} />

        <ProtectedRoute
          authType="normal"
          path="/signup"
          exact
          component={Signup}
        />

        <ProtectedRoute
          authType="normal"
          path="/login"
          exact
          component={Login}
        />

        <ProtectedRoute
          authType="private"
          path="/order"
          exact
          component={OrderForm}
        />

        <ProtectedRoute
          authType="private"
          path="/view-orders"
          exact
          component={ViewOrdersHook}
        />
      </Switch>
    </Router>
  );
};

export default AppRouter;
