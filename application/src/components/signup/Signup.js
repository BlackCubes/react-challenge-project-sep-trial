import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import SignupForm from "./signup-form";
import { finishAuthSuccess } from "../../redux/actions/authActions";

const mapStateToProps = (state) => ({
  errorAuth: state.auth.error,
  successAuth: state.auth.success,
});

const mapDispatchToProps = (dispatch) => ({
  commenceFinishAuthSuccess: (success) => dispatch(finishAuthSuccess(success)),
});

const Signup = ({ commenceFinishAuthSuccess, errorAuth, successAuth }) => {
  const history = useHistory();

  useEffect(() => {
    if (successAuth) {
      commenceFinishAuthSuccess(false);
      history.push("/login");
    }
  }, [successAuth]);

  return (
    <div className="main-body">
      <h1 className="text-center">Signup</h1>

      <div className="d-flex justify-content-center mt-5">
        <SignupForm />
      </div>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);
