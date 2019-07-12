import React from "react";
import { NavLink } from "react-router-dom";
import burgerLogo from "./../../assets/Images/burger-logo.png";
import Classes from "./Logo.css";

const logo = props => (
  <div className={Classes.Logo} style={{ height: props.height }}>
    <NavLink to="/">
      <img src={burgerLogo} alt="Burger Logo" />
    </NavLink>
  </div>
);

export default logo;
