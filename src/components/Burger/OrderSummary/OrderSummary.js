import React from "react";

import AUX from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";

const orderSummary = props => {
  // this could be a functional component, doesn't have to be a class
  // componentWillUpdate(){
  //     console.log('[OrderSummry] willUpdate!')
  // }
  const ingredientSummary = Object.keys(props.ingredients).map(igkey => {
    return (
      <li key={igkey}>
        <span style={{ textTransform: "capitalize" }}>{igkey}</span>:
        {props.ingredients[igkey]}
      </li>
    );
  });

  return (
    <AUX>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <h4>Total Price: {props.price}</h4>
      <p>Continue to Checkout? </p>
      <Button btnType="Danger" clicked={props.purchaseCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.purchaseContinued}>
        CONTINUE
      </Button>
    </AUX>
  );
};

export default orderSummary;
