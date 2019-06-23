import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';


const INGREDIENTS__PRICES = {
    salad: 0.5,
    cheese: 0.5,
    meat: 1.5,
    bacon: 1
};

class BurgerBuilder extends Component {
    // Another way to set states
    // constructor(props){
    //     super(props);
    //     this.state{...};
    // }

    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false
    }

    updatePurchaseState = (ingredients) => {
        // const ingredients = {
        //     ...this.state.ingredients
        // }

        const sum = Object.keys(ingredients).map( igkey => {
            return ingredients[igkey];
        }).reduce((sum,el) => {
            return sum + el;
        },0)

        // if(this.state.totalPrice > 4){
        //     this.state.purchasable = true;
        // }
        this.setState({purchasable: sum > 0});
    }

    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const priceAddition = INGREDIENTS__PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updateIngredients
            }
        )
        this.updatePurchaseState(updateIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount <= 0){
            return;
        }
        const updatedCount = oldCount - 1;
        const updateIngredients = {
            ...this.state.ingredients
        }
        updateIngredients[type] = updatedCount;
        const priceDeduction = INGREDIENTS__PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice - priceDeduction;
        this.setState(
            {
                totalPrice: newPrice,
                ingredients: updateIngredients
            }
        )
        this.updatePurchaseState(updateIngredients);
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false})
    }

    purchaseContinueHandler = () => {
        alert("You continue!");
    }

    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad:true, meat:false ... }

        return(
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler} > 
                    <OrderSummary  
                        ingredients= {this.state.ingredients}
                        purchaseCancelled = {this.purchaseCancelHandler}
                        purchaseContinued = {this.purchaseContinueHandler}
                        price = {this.state.totalPrice.toFixed(2)}
                    />
                </Modal>
                <Burger ingredients= {this.state.ingredients} />
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemove = {this.removeIngredientHandler}
                    disabled = {disabledInfo}
                    purchasable = {this.state.purchasable}
                    price = {this.state.totalPrice}
                    ordered = {this.purchaseHandler}
                />
            </Aux>
        );
    }
}

export default BurgerBuilder;