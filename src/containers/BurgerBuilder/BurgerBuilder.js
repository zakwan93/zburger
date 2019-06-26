import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from '../../axios-orders';


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
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        ingredients: null,
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        error: false
    }

    componentDidMount(){
        axios.get("https://burger-builder-7f125.firebaseio.com/ingredients.json")
            .then(response => {
                this.setState({ingredients: response.data})
            })
            .catch(err => {
                this.setState({error: true})
            });
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
        // alert("You continue!");

        this.setState({loading: true});

        const order = {
            ingredients: this.state.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: "Zakwan Bhaiyat",
                address: {
                    street: "street 1",
                    zipCode: 11372,
                    country: "USA"
                },
                email: "test@test.com"
            },
            deliveryMethod: "fastest"
        }
        axios.post("/orders.json", order)
            .then(response => {
                this.setState({loading: false, purchasing:false});
            })
            .catch(error => {
                this.setState({loading: false, purchasing:false});
            })
        
            // const github = axios.get("https://api.github.com/users/zakwan93/repos")
            // .then(response => console.log(response));

       
    }

    


    render () {

        const disabledInfo = {
            ...this.state.ingredients
        };

        for (let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        // {salad:true, meat:false ... }
        let orderSummary = null;
        let burger =  this.state.error ? <p>Ingredients can't be loaded </p> : <Spinner/>;

        if(this.state.ingredients){
            burger =
                (
                <Aux>
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
                orderSummary = <OrderSummary  
                                ingredients= {this.state.ingredients}
                                purchaseCancelled = {this.purchaseCancelHandler}
                                purchaseContinued = {this.purchaseContinueHandler}
                                price = {this.state.totalPrice.toFixed(2)}
                            />    

        }
        if(this.state.loading){
            orderSummary = <Spinner/>
        }

        

        return(
            <Aux>
                <Modal show={this.state.purchasing} modelClosed={this.purchaseCancelHandler} > 
                    {orderSummary}
                </Modal>
                {burger}

            </Aux>
            
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);