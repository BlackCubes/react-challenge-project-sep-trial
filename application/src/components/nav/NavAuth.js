import React from "react";
import NavAuthSub from "./nav-auth-sub";
import "./NavAuth.css";

const NavAuth = (props) => {
  return (
    <div className="bg-layer">
      <div className="fg-layer">
        <label className="logo">Bruce's Diner</label>

        <NavAuthSub />

        {props.children}
      </div>
    </div>
  );
};

export default NavAuth;
