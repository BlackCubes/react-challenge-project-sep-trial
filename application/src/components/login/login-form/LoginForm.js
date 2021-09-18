import React, { useState } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../../redux/actions/authActions";
import { checkErrors, checkHasInputs, validatorHandler } from "../../../utils";

const mapActionsToProps = (dispatch) => ({
  commenceLogin(email, password) {
    dispatch(loginUser(email, password));
  },
});

const LoginForm = ({ commenceLogin }) => {
  const [inputValues, setInputValues] = useState({
    email: "",
    password: "",
  });
  const [inputErrors, setInputErrors] = useState({
    email: "",
    password: "",
  });

  const loginOnChange = (e) => {
    const { name, value } = e.target;

    setInputValues((previousValues) => ({
      ...previousValues,
      [name]: value,
    }));
  };

  const loginSubmit = (e) => {
    e.preventDefault();

    setInputErrors(validatorHandler(inputValues));

    const hasInputs = checkHasInputs(inputValues);
    const hasNoErrors = checkErrors(inputErrors);

    if (hasInputs && hasNoErrors) {
      const { email, password } = inputValues;

      commenceLogin(email, password);
    }
  };

  return (
    <form onSubmit={loginSubmit}>
      <div className="form-group">
        <label htmlFor="loginEmail">Email</label>

        <input
          type="text"
          className="form-control"
          id="loginEmail"
          placeholder="test@test.com"
          value={inputValues.email}
          onChange={loginOnChange}
        ></input>

        {inputErrors.email.length > 0 && <span>{inputErrors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="loginPassword">Password</label>

        <input
          type="password"
          className="form-control"
          id="loginPassword"
          value={inputValues.password}
          onChange={loginOnChange}
        ></input>

        {inputErrors.password.length > 0 && <span>{inputErrors.password}</span>}
      </div>

      <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </div>
    </form>
  );
};

export default connect(null, mapActionsToProps)(LoginForm);
