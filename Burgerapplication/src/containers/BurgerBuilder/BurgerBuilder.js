import React , {Component} from 'react'
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'

const INGREDIENT_PRICES = {
    salad :0.5,
    bacon :0.7,
    meat : 1.3,
    cheese : 0.4
}

class BurgerBuilder extends Component {

    state = {
        ingredients : {
            salad : 0,
            cheese : 0,
            meat : 0,
            bacon : 0
        },
        totalPrice : 4,
        purchasable : false,
        purchasing : false
    }

    continueOrderHandler = () =>{
        alert('rahul');
    }
    hideModalHandler = () => {
        this.setState({
            purchasing : false
        });
    }
    purchasingHandler = () =>{
        this.setState({
            purchasing : true
        });
    }
    updatePurchasable (localIngredients) {     
        const sum = Object.keys(localIngredients)
        .map((igKey) => {
            return localIngredients[igKey];     
        }).reduce((sum,el)=>{
            return sum + el;
        },0);
        this.setState({
            purchasable : sum > 0
        });
    }

    addIngredientHandler= (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        };

        updatedIngredient[type] = updatedCount;
        this.setState({
            ingredients : updatedIngredient,
            totalPrice : this.state.totalPrice + INGREDIENT_PRICES[type]
        });
        this.updatePurchasable(updatedIngredient);
    }

    removeIngredientHandler= (type) => {
        if(this.state.ingredients[type] !== 0){
            const updatedCount = this.state.ingredients[type] - 1;
            const updatedIngredient = {
                ...this.state.ingredients
            };

            updatedIngredient[type] = updatedCount;
            this.setState({
                ingredients : updatedIngredient,
                totalPrice : this.state.totalPrice - INGREDIENT_PRICES[type]
            });
            this.updatePurchasable(updatedIngredient);
        }
        
    }

    render(){
        const disabledInfo = {
            ...this.state.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} close={this.hideModalHandler}>
                    <OrderSummary ingredients={this.state.ingredients} 
                    price = {this.state.totalPrice}
                    cancel={this.hideModalHandler} continue={this.continueOrderHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls 
                disabledInfo={disabledInfo} 
                ingredientAdded={this.addIngredientHandler} 
                ingredientRemoved={this.removeIngredientHandler}
                price = {this.state.totalPrice}
                purchasable = {this.state.purchasable}
                purchasing = {this.purchasingHandler}/>
            </Aux>
        );
    }
}

export default BurgerBuilder;