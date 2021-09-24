import React, { useEffect } from "react";
import { connect } from "react-redux";
import NavAuth from "../nav";
import OrdersList from "./orders-list/OrdersList";
import "./ViewOrders.css";
import { currentOrders } from "../../redux/actions/orderActions";

const mapDispatchToProps = (dispatch) => ({
  commenceCurrentOrders: () => dispatch(currentOrders()),
});

const ViewOrders = ({ commenceCurrentOrders }) => {
  useEffect(() => {
    commenceCurrentOrders();
  }, []);

  return (
    <>
      <NavAuth />

      <div className="bg-layer">
        <div className="fg-layer">
          <div className="container-fluid">
            <OrdersList />
          </div>
        </div>
      </div>
    </>
  );
};

export default connect(null, mapDispatchToProps)(ViewOrders);
