import React, { useState } from "react";
import { connect } from "react-redux";
import { Template } from "../../components";
import { addOrder } from "../../redux/actions/orderActions";
import "./orderForm.css";

const mapStateToProps = (state) => ({
  authEmail: state.auth.email,
});

const mapDispatchToProps = (dispatch) => ({
  commenceAddOrder: (order_item, quantity, ordered_by) =>
    dispatch(addOrder(order_item, quantity, ordered_by)),
});

const OrderForm = ({ authEmail, commenceAddOrder }) => {
  const [orderItem, setOrderItem] = useState("");
  const [quantity, setQuantity] = useState("1");

  const menuItemChosen = (event) => setOrderItem(event.target.value);
  const menuQuantityChosen = (event) => setQuantity(event.target.value);

  const submitOrder = () => {
    if (orderItem === "") return;
    const ordered_by = authEmail || "Unknown!";

    commenceAddOrder(orderItem, quantity, ordered_by);
  };

  return (
    <Template>
      <div className="form-wrapper">
        <form>
          <label className="form-label">I'd like to order...</label>
          <br />
          <select
            value={orderItem}
            onChange={menuItemChosen}
            className="menu-select"
          >
            <option value="" defaultValue disabled hidden>
              Lunch menu
            </option>
            <option value="Soup of the Day">Soup of the Day</option>
            <option value="Linguini With White Wine Sauce">
              Linguini With White Wine Sauce
            </option>
            <option value="Eggplant and Mushroom Panini">
              Eggplant and Mushroom Panini
            </option>
            <option value="Chili Con Carne">Chili Con Carne</option>
          </select>
          <br />
          <label className="qty-label">Qty:</label>
          <select value={quantity} onChange={menuQuantityChosen}>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </select>
          <button type="button" className="order-btn" onClick={submitOrder}>
            Order It!
          </button>
        </form>
      </div>
    </Template>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderForm);
