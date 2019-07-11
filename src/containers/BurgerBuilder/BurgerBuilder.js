import React, { Component } from "react";
import { connect } from "react-redux";

import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as action from "../../store/actions/index";
import axios from "../../axios-orders";

class BurgerBuilder extends Component {
  // Another way to set states
  // constructor(props){
  //     super(props);
  //     this.state{...};
  // }

  state = {
    purchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  updatePurchaseState = ingredients => {
    // const ingredients = {
    //     ...this.state.ingredients
    // }

    const sum = Object.keys(ingredients)
      .map(igkey => {
        return ingredients[igkey];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  purchaseHandler = () => {
    if (this.props.isAuthanticated) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPAth("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  purchaseContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const disabledInfo = {
      // ...this.state.ingredients --> passing it now from reducer
      ...this.props.ings
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    // {salad:true, meat:false ... }
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded </p>
    ) : (
      <Spinner />
    );

    if (this.props.ings) {
      burger = (
        <Aux>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientRemove={this.props.onIngredientsRemoved}
            disabled={disabledInfo}
            purchasable={this.updatePurchaseState(this.props.ings)}
            price={this.props.price}
            ordered={this.purchaseHandler}
            isAuth={this.props.isAuthanticated}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCancelled={this.purchaseCancelHandler}
          purchaseContinued={this.purchaseContinueHandler}
          price={this.props.price.toFixed(2)}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modelClosed={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthanticated: state.auth.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientsAdded: ingName => dispatch(action.addIngredient(ingName)),
    onIngredientsRemoved: ingName => dispatch(action.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(action.initIngredients()),
    onInitPurchase: () => dispatch(action.purchaseInit()),
    onSetAuthRedirectPAth: path => dispatch(action.setAuthRedirectPath(path))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
