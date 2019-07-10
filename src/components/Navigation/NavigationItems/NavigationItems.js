import React from "react";

import NavigationItem from "./NavigationItem/NavigationItem";
import Classes from "./NavigationItems.css";

const navigationItems = props => (
  <ul className={Classes.NavigationItems}>
    <NavigationItem link="/" exact>
      Burger Builder
    </NavigationItem>
    <NavigationItem link="/orders">Orders</NavigationItem>
    {!props.isAuthanticated ? (
      <NavigationItem link="/auth">Authanticate</NavigationItem>
    ) : (
      <NavigationItem link="/logout">Logout</NavigationItem>
    )}
  </ul>
);

export default navigationItems;
