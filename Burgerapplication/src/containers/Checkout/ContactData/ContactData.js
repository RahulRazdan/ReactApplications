import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css'
import axios from '../../../axios-orders'
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {

    state = {
        name : '',
        email : '',
        address : {
            street : '',
            postalCode : ''
        },
        loading : false
    }

    orderHandler =(event) =>{
        event.preventDefault();
        console.log(this.props);
        this.setState({
            loading : true
        });
        const data = {
            ingredients : this.props.ingredients,
            totalPrice : this.props.totalPrice,
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
    render(){

        let form = (<form>
            <input className={classes.Input} type="text" name="name" placeholder="Your Name"/>
            <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
            <input className={classes.Input} type="text" name="street" placeholder="Street"/>
            <input className={classes.Input} type="text" name="postal" placeholder="Postal Code"/>
            <Button btnType="Success" clicked={this.orderHandler}>ORDER</Button>
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