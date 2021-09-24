import React from "react";
import ReactDOM from "react-dom";
import { connect } from "react-redux";
import { deleteSnackbar } from "../../redux/actions/snackbarActions";
import "./Snackbar.css";

const mapStateToProps = (state) => ({
  messages: state.snackbar.messages,
  messageReadCount: state.snackbar.messageReadCount,
  totalCount: state.snackbar.totalCount,
});

const mapDispatchToProps = (dispatch) => ({
  commenceDeleteSnackbar: (id) => dispatch(deleteSnackbar(id)),
});

const Snackbar = ({
  commenceDeleteSnackbar,
  messages,
  messageReadCount,
  totalCount,
}) => {
  if (!messages.length) return null;

  return ReactDOM.createPortal(
    <div className={`snackbar ${messages[0].color} show`}>
      <div className="snackbar-button">
        <button onClick={() => commenceDeleteSnackbar(messages[0].id)}>
          &#10005;
        </button>
      </div>

      <div className="snackbar-content">
        <p>{messages[0].content}</p>
      </div>

      <div className="snackbar-count">
        <p>
          {messageReadCount}/{totalCount}
        </p>
      </div>
    </div>,
    document.getElementById("snackbar")
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Snackbar);
