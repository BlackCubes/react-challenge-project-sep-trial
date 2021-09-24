import React from "react";
import "./NormalNav.css";

const NormalNav = (props) => {
  return (
    <div className="bg-layer">
      <div className="fg-layer">
        <label className="logo">Bruce's Diner</label>
        {props.children}
      </div>
    </div>
  );
};

export default NormalNav;
