import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { logoutUser } from "../../redux/actions/authActions";
import {
  websocketAddOrder,
  websocketConnect,
  websocketDeleteOrder,
  websocketMessage,
} from "../../redux/actions/websocketActions";
import "./NavAuthSub.css";

const mapStateToProps = (state) => ({
  authEmail: state.auth.email,
  socketMessage: state.websocket.message,
});

const mapDispatchToProps = (dispatch) => ({
  commenceLogoutUser: () => dispatch(logoutUser()),
  commenceWebsocketAddOrder: () => dispatch(websocketAddOrder()),
  commenceWebsocketConnect: () => dispatch(websocketConnect()),
  commenceWebsocketDeleteOrder: () => dispatch(websocketDeleteOrder()),
  commenceWebsocketMessage: () => dispatch(websocketMessage()),
});

const NavAuthSub = ({
  commenceLogoutUser,
  commenceWebsocketAddOrder,
  commenceWebsocketConnect,
  commenceWebsocketDeleteOrder,
  commenceWebsocketMessage,
  authEmail,
  socketMessage,
}) => {
  const history = useHistory();

  const logoutOnClick = () => {
    commenceLogoutUser();
    history.replace("/");
  };

  useEffect(() => {
    commenceWebsocketConnect();
    commenceWebsocketMessage();

    commenceWebsocketAddOrder();
    commenceWebsocketDeleteOrder();
  }, []);
  console.log("Socket message: ", socketMessage);

  return (
    <div className="nav-strip">
      <Link to={"/order"} className="nav-link">
        <div className="nav-link-style">
          <label className="nav-label">Order Form</label>
        </div>
      </Link>

      <Link to={"/view-orders"} className="nav-link" id="middle-link">
        <div className="nav-link-style">
          <label className="nav-label">View Orders</label>
        </div>
      </Link>

      <Link to="#" className="nav-link" id="profile-link">
        <div className="nav-link-style">
          <label className="nav-label">
            Profile: {authEmail ?? "No email"}
          </label>
        </div>
      </Link>

      <button className="btn btn-link nav-link" onClick={() => logoutOnClick()}>
        <div className="nav-link-style">
          <label className="nav-label">Log Out</label>
        </div>
      </button>
    </div>
  );
};
export default connect(mapStateToProps, mapDispatchToProps)(NavAuthSub);
