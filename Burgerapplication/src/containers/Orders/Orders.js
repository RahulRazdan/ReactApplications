import React,{Component} from 'react';
import Order from '../../components/Order/Order/Order';
import axios from '../../axios-orders'
import {connect} from 'react-redux'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../store/actions/order'
import Spinner from '../../components/UI/Spinner/Spinner'
class Orders extends Component {
    state = {
        orders : [],
        loading : true
    }

    componentDidMount(){
        this.props.loadOrders(this.props.token,this.props.userId);
    }
    render() {
        let myorders = <Spinner />
        if(!this.props.loading){
            myorders = this.props.orders.map(order => {
                return <Order 
                    key={order.id}
                    ingredients = {order.ingredients}
                    price = {order.totalPrice}/>
            });
        }
        return (
<div>
    {myorders}
</div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders : state.order.orders,
        loading : state.order.loading,
        token : state.auth.token,
        userId : state.auth.userId
    }
}
const mapDispatchToProps = dispatch => {
    return {
        loadOrders : (token,userId) => dispatch(actions.fetchOrders(token,userId))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(Orders,axios));