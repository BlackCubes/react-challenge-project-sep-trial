import React from "react";
import "./NavAuth.css";

const NavAuth = (props) => {
  return (
    <div className="bg-layer">
      <div className="fg-layer">
        <label className="logo">Bruce's Diner</label>
        {props.children}
      </div>
    </div>
  );
};

export default NavAuth;
