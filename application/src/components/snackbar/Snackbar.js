import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { deleteSnackbar } from "../../redux/actions/snackbarActions";
import "./Snackbar.css";

const mapStateToProps = (state) => ({
  snackbarCount: state.snackbar.count,
  snackbarMessages: state.snackbar.messages,
});

const mapDispatchToProps = (dispatch) => ({
  commenceDeleteSnackbar: (id) => dispatch(deleteSnackbar(id)),
});

const Snackbar = ({
  commenceDeleteSnackbar,
  snackbarCount,
  snackbarMessages,
}) => {
  if (!snackbarMessages.length) return null;

  return ReactDOM.createPortal(
    <div
      className={`snackbar ${snackbarMessages[0].color} show`}
      onClick={() => commenceDeleteSnackbar(snackbarMessages[0].id)}
    >
      {snackbarMessages[0].content}
    </div>,
    document.getElementById("snackbar")
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
