import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Template } from "../../components";
import OrdersList from "./ordersList";
import "./viewOrders.css";
import { currentOrders } from "../../redux/actions/orderActions";

const mapDispatchToProps = (dispatch) => ({
  commenceCurrentOrders: () => dispatch(currentOrders()),
});

const ViewOrders = ({ commenceCurrentOrders }) => {
  useEffect(() => {
    commenceCurrentOrders();
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
