import React , {Component} from 'react'
import * as burgerBuilderAction from '../../store/actions/burgerBuilder';
import {connect} from 'react-redux'
import Aux from '../../hoc/Auxillary'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axios from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../store/actions/order'
import * as authActions from '../../store/actions/auth'

export class BurgerBuilder extends Component {

    state = {
        purchasable : false,
        purchasing : false,
        loading : false,
        errors : false
    }

    componentDidMount() {

        this.props.onInitIngredients();
    }
    continueOrderHandler = () =>{
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }
    hideModalHandler = () => {
        this.setState({
            purchasing : false
        });
    }
    purchasingHandler = () =>{
        if(this.props.isAuthenticated){
            this.setState({
                purchasing : true
            });
        }else{
            this.props.onSetDirectPath('/checkout');
            this.props.history.push('/auth');            
        }
    }
    updatePurchasable (localIngredients) {     
        const sum = Object.keys(localIngredients)
        .map((igKey) => {
            return localIngredients[igKey];     
        }).reduce((sum,el)=>{
            return sum + el;
        },0);
        return sum > 0;
    }   

    render(){
        const disabledInfo = {
            ...this.props.ingredients
        };

        for(let key in disabledInfo){
            disabledInfo[key] = disabledInfo[key] <=0
        }

        let orderSummary = null;
        let burger = this.props.errors ? <p><strong><center>Unable to load ingredients</center></strong></p> : <Spinner/>;

        if(this.props.ingredients){
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls 
                    disabledInfo={disabledInfo} 
                    ingredientAdded={this.props.onAddIngredient} 
                    ingredientRemoved={this.props.onRemoveIngredient}
                    price = {this.props.totalPrice}
                    isAuthenticated = {this.props.isAuthenticated}
                    purchasable = {this.updatePurchasable(this.props.ingredients)}
                    purchasing = {this.purchasingHandler}/>
                </Aux>
            );
            orderSummary = (<OrderSummary ingredients={this.props.ingredients} 
                price = {this.props.totalPrice}
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

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        errors : state.burgerBuilder.errors,
        isAuthenticated : state.auth.token !== null
    };
};

const mapDispatchToProps = dispatch =>{
    return {
        onAddIngredient : (ingName) => dispatch(burgerBuilderAction.addIngredient(ingName)),
        onRemoveIngredient : (ingName) => dispatch(burgerBuilderAction.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(burgerBuilderAction.initIngredient()),
        onInitPurchase : () => dispatch(actions.purchaseInit()),
        onSetDirectPath : (path) => dispatch(authActions.setAuthRedirectPath(path))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));