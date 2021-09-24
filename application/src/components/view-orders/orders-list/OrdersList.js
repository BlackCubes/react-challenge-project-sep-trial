import React from "react";
import { connect } from "react-redux";
import { deleteOrder, editOrder } from "../../../redux/actions/orderActions";
import { localTimeStringMilitary } from "../../../utils";

const mapStateToProps = (state) => ({
  orderLoading: state.order.loading,
  orders: state.order.orders,
});

const mapStateToDispatch = (dispatch) => ({
  commenceDeleteOrder: (id) => dispatch(deleteOrder(id)),
  commenceEditOrder: (id, order_item, quantity, ordered_by) =>
    dispatch(editOrder(id, order_item, quantity, ordered_by)),
});

const OrdersList = ({
  commenceDeleteOrder,
  commenceEditOrder,
  orderLoading,
  orders,
}) => {
  if (!orders || !orders.length)
    return (
      <div className="empty-orders">
        <h2>There are no orders to display</h2>
      </div>
    );

  return orders.map((order) => (
    <div className="row view-order-container" key={order._id}>
      <div className="col-md-4 view-order-left-col p-3">
        <h2>{order.order_item}</h2>
        <p>Ordered by: {order.ordered_by || ""}</p>
      </div>
      <div className="col-md-4 d-flex view-order-middle-col">
        <p>Order placed at {localTimeStringMilitary(order.createdAt)}</p>
        <p>Quantity: {order.quantity}</p>
      </div>
      <div className="col-md-4 view-order-right-col">
        <button
          className="btn btn-success"
          {...(!orderLoading && {
            onClick: () =>
              commenceEditOrder(
                order._id,
                order.order_item,
                order.quantity,
                "Elias Gutierrez"
              ),
          })}
          disabled={orderLoading}
        >
          Edit
        </button>
        <button
          className="btn btn-danger"
          {...(!orderLoading && {
            onClick: () => commenceDeleteOrder(order._id),
          })}
          disabled={orderLoading}
        >
          Delete
        </button>
      </div>
    </div>
  ));
};

export default connect(mapStateToProps, mapStateToDispatch)(OrdersList);
