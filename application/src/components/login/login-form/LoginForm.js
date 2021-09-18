import React, { useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { loginUser } from "../../../redux/actions/authActions";

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
  const history = useHistory();

  const login = (e) => {
    e.preventDefault();
    commenceLogin(this.state.email, this.state.password);
    history.push("/view-orders");
  };

  const onChange = (key, val) => {
    setInputValues({ [key]: val });
  };

  return (
    <form>
      <div className="form-group">
        <label htmlFor="inputEmail">Email</label>
        <input
          type="text"
          className="form-control"
          id="inputEmail"
          placeholder="test@test.com"
          value={inputValues.email}
          onChange={(e) => onChange("email", e.target.value)}
        ></input>
      </div>
      <div className="form-group">
        <label htmlFor="inputPassword">Password</label>
        <input
          type="password"
          className="form-control"
          id="inputPassword"
          value={inputValues.password}
          onChange={(e) => onChange("password", e.target.value)}
        ></input>
      </div>
      <div className="d-flex justify-content-center">
        <button
          onClick={(e) => login(e)}
          type="submit"
          className="btn btn-primary"
        >
          Login
        </button>
      </div>
    </form>
  );
};

export default connect(null, mapActionsToProps)(LoginForm);
