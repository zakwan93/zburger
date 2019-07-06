import React from "react";
import { NavLink } from "react-router-dom";

import Classes from "./NavigationItem.css";

const navigationItem = props => (
  <li className={Classes.NavigationItem}>
    <NavLink
      to={props.link}
      exact={props.exact}
      activeClassName={Classes.active}
    >
      {props.children}
    </NavLink>
  </li>
);

export default navigationItem;
