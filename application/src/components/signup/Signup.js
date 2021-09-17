import React from "react";
import { connect } from "react-redux";
import SignupForm from "./signup-form";

const mapStateToProps = (state) => ({
  errorAuth: state.auth.error,
});

const Signup = ({ errorAuth }) => (
  <div className="main-body">
    <h1 className="text-center">Signup</h1>

    <div className="d-flex justify-content-center mt-5">
      <SignupForm />
    </div>
  </div>
);

export default connect(mapStateToProps, null)(Signup);
