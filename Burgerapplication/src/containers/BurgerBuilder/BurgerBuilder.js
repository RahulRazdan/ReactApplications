import React , {Component} from 'react'
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

const INGREDIENT_PRICES = {
    salad :0.5,
    bacon :0.7,
    meat : 1.3,
    cheese : 0.4
}

class BurgerBuilder extends Component {

    state = {
        ingredients : null,
        totalPrice : 4,
        purchasable : false,
        purchasing : false,
        loading : false,
        errors : false
    }

    componentDidMount(){
        axios.get('/ingredients.json').then(response => {
            this.setState({
                ingredients : response.data
            })
            }).catch(error =>{
                this.setState({
                    errors : true
            });
        });
    }
    continueOrderHandler = () =>{
       /* this.setState({
            loading : true
        });
        const data = {
            ingredients : this.state.ingredients,
            totalPrice : this.state.totalPrice.toFixed(2),
            customer : {
                name : 'Rahul Razdan',
                address : {
                    street : 'BTM',
                    zipCode : '123123',
                    country : 'India'
                },
                email : 'test@test.com'
            },
            deliveryMethod : 'fastest'
        }
        axios.post('/orders.json',data).then(response => {
            alert('Continue success');
            this.setState({
                loading : false,
                purchasing : false
            });
        }).catch(errors => {
            alert('Continue failed');
            this.setState({
                loading : false,
                purchasing : false
            });
        })*/

        this.props.history.push('/checkout');
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

        let orderSummary = null;
        let burger = this.state.errors ? <p><strong><center>Unable to load ingredients</center></strong></p> : <Spinner/>;

        if(this.state.ingredients){
            burger = (
                <Aux>
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
            orderSummary = (<OrderSummary ingredients={this.state.ingredients} 
                price = {this.state.totalPrice}
            cancel={this.hideModalHandler} continue={this.continueOrderHandler}/>);
        }

        if(this.state.loading){
            orderSummary = <Spinner/>
        }
        return (
            <Aux>
                <Modal show={this.state.purchasing} close={this.hideModalHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

export default withErrorHandler(BurgerBuilder,axios);