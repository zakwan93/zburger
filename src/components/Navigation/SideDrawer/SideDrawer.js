import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import Classes from "./SideDrawer.css";
import Backdrop from "../../UI/Backdrop/Backdrop";
import Aux from "../../../hoc/Aux/Aux";

const sideDrawer = props => {
  let attachClasses = [Classes.SideDrawer, Classes.Close];
  if (props.open) {
    attachClasses = [Classes.SideDrawer, Classes.Open];
  }

  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div className={attachClasses.join(" ")}>
        {/* <Logo height = "11%" /> */}
        <div className={Classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems isAuthanticated={props.isAuth} />
        </nav>
      </div>
    </Aux>
  );
};

export default sideDrawer;
