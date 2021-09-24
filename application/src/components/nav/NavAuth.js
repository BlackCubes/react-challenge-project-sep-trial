import React from "react";
import NavAuthSub from "./nav-auth-sub";
import "./NavAuth.css";

const NavAuth = (props) => {
  return (
    <div className="nav-auth">
      <div className="nav-auth__container">
        <label className="logo">Bruce's Diner</label>

        <NavAuthSub />
      </div>
    </div>
  );
};

export default NavAuth;
