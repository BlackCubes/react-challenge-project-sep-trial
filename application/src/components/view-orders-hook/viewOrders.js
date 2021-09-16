import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Template } from "../../components";
import OrdersList from "./ordersList";
import "./viewOrders.css";
import { getCurrentOrders } from "../../redux/actions/orderActions";

const mapDispatchToProps = (dispatch) => ({
  commenceGetCurrentOrders: () => dispatch(getCurrentOrders()),
});

const ViewOrders = ({ commenceGetCurrentOrders }) => {
  useEffect(() => {
    commenceGetCurrentOrders();
  }, []);

  return (
    <Template>
      <div className="container-fluid">
        <OrdersList />
      </div>
    </Template>
  );
};

export default connect(null, mapDispatchToProps)(ViewOrders);
