import React, { useState } from "react";
import { connect } from "react-redux";
import { signupUser } from "../../../redux/actions/authActions";

const mapDispatchToProps = (dispatch) => ({
  commenceSignupUser: (email, password, password_confirmation) =>
    dispatch(signupUser(email, password, password_confirmation)),
});

const SignupForm = ({ commenceSignupUser }) => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });

  const signupOnChange = (e) => {
    const { name, value } = e.target;

    setInputValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const signupSubmit = (e) => {
    e.preventDefault();

    const { email, password, password_confirmation } = inputValues;

    commenceSignupUser(email, password, password_confirmation);
  };

  return (
    <form onSubmit={signupSubmit}>
      <div className="form-group">
        <label htmlFor="signupEmail">Email</label>

        <input
          type="email"
          name="email"
          className="form-control"
          id="signupEmail"
          placeholder="gucci@test.com"
          value={inputValues.email}
          onChange={signupOnChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupPassword">Password</label>

        <input
          type="password"
          name="password"
          className="form-control"
          id="signupPassword"
          value={inputValues.password}
          onChange={signupOnChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="signupPasswordConfirm">Confirm Password</label>

        <input
          type="password"
          name="password_confirmation"
          className="form-control"
          id="signupPasswordConfirm"
          value={inputValues.password_confirmation}
          onChange={signupOnChange}
        />
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary">Signup</button>
      </div>
    </form>
  );
};

export default connect(null, mapDispatchToProps)(SignupForm);
