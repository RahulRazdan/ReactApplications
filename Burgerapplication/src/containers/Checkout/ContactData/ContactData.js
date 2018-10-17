import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {

    state = {
        orderForm : {
            name : {
                elementType : 'input',
                elementConfig : {
                    type:'text',
                    placeholder : 'Your Name'
                },
                value : ''
            },
            street : {
                elementType : 'input',
                elementConfig : {
                    type:'text',
                    placeholder : 'Your Street'
                },
                value : ''
            },
            zipCode : {
                elementType : 'input',
                elementConfig : {
                    type:'text',
                    placeholder : 'Postal Code'
                },
                value : ''
            },
            country : {
                elementType : 'input',
                elementConfig : {
                    type:'text',
                    placeholder : 'Your Country'
                },
                value : ''
            },
            email : {
                elementType : 'input',
                elementConfig : {
                    type:'email',
                    placeholder : 'Your Email'
                },
                value : ''
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
                value : ''
            }
        },
        loading : false
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
            orderData : formData
        }
        axios.post('/orders.json',data).then(response => {
            alert('Continue success');
            this.setState({
                loading : false
            });
            this.props.history.push('/');

        }).catch(errors => {
            alert('Continue failed');
            this.setState({
                loading : false
            });
        })

        console.log(this.props.ingredients);
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedForm = {
            ...this.state.orderForm
        }
        const formData = {...updatedForm[inputIdentifier]};
        formData.value = event.target.value;

        updatedForm[inputIdentifier] = formData;

        this.setState({
            orderForm : updatedForm
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
                elementConfig={element.config.elementConfig}
                defaultValue={element.config.value}
                changed={(event) => this.inputChangedHandler(event,element.id)}/> 
            })}
            <Button btnType="Success">ORDER</Button>
        </form>);

        if(this.state.loading){
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

export default ContactData;