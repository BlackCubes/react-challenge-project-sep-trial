import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import {
  Main,
  Login,
  OrderFormHook,
  Signup,
  ViewOrdersHook,
} from "../components";

const AppRouter = (props) => {
  return (
    <Router>
      <Route path="/" exact component={Main} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/login" exact component={Login} />
      <Route path="/order" exact component={OrderFormHook} />
      <Route path="/view-orders" exact component={ViewOrdersHook} />
    </Router>
  );
};

export default AppRouter;
