import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import LoginForm from "./login-form";
import { finishAuthSuccess } from "../../redux/actions/authActions";
import "./login.css";

const mapStateToProps = (state) => ({
  errorAuth: state.auth.error,
  successAuth: state.auth.success,
});

const mapDispatchToProps = (dispatch) => ({
  commenceFinishAuthSuccess: (success) => dispatch(finishAuthSuccess(success)),
});

const Login = ({ commenceFinishAuthSuccess, errorAuth, successAuth }) => {
  const history = useHistory();

  useEffect(() => {
    if (successAuth) {
      commenceFinishAuthSuccess(false);
      history.replace("/view-orders");
    }
  }, [successAuth]);

  return (
    <div className="main-body">
      <h1 className="text-center">Login Screen</h1>

      <div className="d-flex flex-column justify-content-center mt-5">
        <LoginForm />

        <div className="mt-4">
          <small>
            New? <Link to="/signup">Sign up now</Link>.
          </small>
        </div>
      </div>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(Login);
