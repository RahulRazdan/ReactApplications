import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as orderAction from '../../../store/actions/order'
import {checkValidity} from '../../../store/Utility';
class ContactData extends Component {

    state = {
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig : {
                    type:'text',
                    placeholder : 'Your Name'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type:'text',
                    placeholder : 'Your Street'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type:'text',
                    placeholder : 'Postal Code'
                },
                value : '',
                validation : {
                    required : true,
                    minLength:3,
                    maxLength:6
                },
                valid : false,
                touched : false
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type:'text',
                    placeholder : 'Your Country'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type:'email',
                    placeholder : 'Your Email'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            deliveryMethod : {
                elementType : 'select',
                elementConfig : {
                   options : [{
                        value : 'fastest',
                        displayValue : 'Fastest'
                   },{
                        value : 'cheapest',
                        displayValue : 'Cheapest'
                   }
                   ]
                },
                value : 'fastest',
                valid : true,
                touched : false
            }
        },
        formIsValid : false
    }

    orderHandler =(event) =>{
        event.preventDefault();
        console.log(this.props);
        this.setState({
            loading : true
        });

        const formData = {};
        for(let key in this.state.orderForm){
            formData[key] = this.state.orderForm[key].value;
        }
        const data = {
            ingredients : this.props.ingredients,
            totalPrice : this.props.totalPrice,
            orderData : formData,
            userId : this.props.userId
        }
        
        this.props.OnOrderBurger(data,this.props.token);
        console.log(this.props.ingredients);
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const formData = {...updatedForm[inputIdentifier]};
        formData.value = event.target.value;
        formData.valid = checkValidity(formData.value,formData.validation);
        formData.touched = true;
        updatedForm[inputIdentifier] = formData;

        let isFormValid = true;
        
        for(let key in updatedForm){
            isFormValid = updatedForm[key].valid && isFormValid;
        }

        console.log(isFormValid)
        this.setState({
            orderForm : updatedForm,
            formIsValid : isFormValid   
        });
    }
    render(){

        let formArray = [];
        for(let key in this.state.orderForm){
            formArray.push({
                id : key,
                config:this.state.orderForm[key]
            });
        }
        let form = (<form onSubmit={this.orderHandler}>
            {formArray.map(element =>{
                return <Input key={element.id} elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} shouldValidate={element.config.validation}
                defaultValue={element.config.value} valid={element.config.valid} touched={element.config.touched}
                changed={(event) => this.inputChangedHandler(event,element.id)}/> 
            })}
            <Button disabled={!this.state.formIsValid} btnType="Success">ORDER</Button>
        </form>);

        if(this.props.loading){
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        ingredients : state.burgerBuilder.ingredients,
        totalPrice : state.burgerBuilder.totalPrice,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    };
};

const mapDispatchToProps = dispatch => {
    return {
        OnOrderBurger : (orderData,token) => dispatch(orderAction.purchaseBurger(orderData,token))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));