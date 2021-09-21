import React, { useState } from "react";
import { connect } from "react-redux";
import { signupUser } from "../../../redux/actions/authActions";
import { checkErrors, checkHasInputs, validatorHandler } from "../../../utils";

const mapStateToProps = (state) => ({
  authLoading: state.auth.loading,
});

const mapDispatchToProps = (dispatch) => ({
  commenceSignupUser: (email, password, password_confirmation) =>
    dispatch(signupUser(email, password, password_confirmation)),
});

const SignupForm = ({ authLoading, commenceSignupUser }) => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
    password_confirmation: "",
  });
  const [inputErrors, setInputErrors] = useState({
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

    setInputErrors(validatorHandler(inputValues));

    const hasInputs = checkHasInputs(inputValues);
    const hasNoErrors = checkErrors(inputErrors);

    if (hasInputs && hasNoErrors) {
      const { email, password, password_confirmation } = inputValues;

      commenceSignupUser(email, password, password_confirmation);
    }
  };

  return (
    <form
      {...(!authLoading && {
        onSubmit: signupSubmit,
      })}
    >
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

        {inputErrors.email.length > 0 && <span>{inputErrors.email}</span>}
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

        {inputErrors.password.length > 0 && <span>{inputErrors.password}</span>}
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

        {inputErrors.password_confirmation.length > 0 && (
          <span>{inputErrors.password_confirmation}</span>
        )}
      </div>

      <div className="d-flex justify-content-center">
        <button className="btn btn-primary" disabled={authLoading}>
          {!authLoading ? "Signup" : "...."}
        </button>
      </div>
    </form>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm);
