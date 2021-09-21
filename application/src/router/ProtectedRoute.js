import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router-dom";

const mapStateToProps = (state) => ({
  authToken: state.auth.token,
});

const ProtectedRoute = ({ authToken, authType, ...rest }) => {
  // Gets the token and checks if it is there.
  // The first 'not' checks if it is false which equates to true:
  // null is false which means !null is true (it's true there is nothing).
  // The second 'not' is used mainly to check if there is a token, and this
  // was done because we want to return a boolean and not a value.
  // If null --> !!null = !true = false.
  // If not null and a value --> !!token = !false = true.
  const isAuth = () => !!authToken;

  // If the user is logged in but the route(s) are for non-logged in users,
  // then redirect to the welcome page.
  if (authType === "normal" && isAuth()) return <Redirect to="/view-orders" />;

  // If the user is not logged in but the route(s) are for logged in users,
  // then redirect to the login page.
  if (authType === "private" && !isAuth()) return <Redirect to="/login" />;

  return <Route {...rest} />;
};

export default connect(mapStateToProps, null)(ProtectedRoute);
