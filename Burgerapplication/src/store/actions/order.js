import * as actionTypes from './actionTypes';
import axios from '../../axios-orders'

const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders : orders
    }
}

const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAIL,
        errors : error
    }
}

const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START
    }
}

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
    .then(res => {
        const fetchedOrders = [];
        for(let key in res.data){
            fetchedOrders.push({
                ...res.data[key],
                id:key
            });
        }
        dispatch(fetchOrdersSuccess(fetchedOrders));
       
    }).catch(err => {
        dispatch(fetchOrdersFail(err));
    })
}
} 

const purchaseBurgerSuccess = (id,orderData) =>{
    return {
        type : actionTypes.PURCHASE_BURGER_SUCCESS,
        orderid : id,
        orderData : orderData
    }
}

const purchaseBurgerFail = (error) =>{
    return {
        type : actionTypes.PURCHASE_BURGER_FAIL,
        error:error
    }
}

const purchaseBurgerStart = () =>{
    return {
        type : actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseInit = () => {
    return {
        type : actionTypes.PURCHASE_INIT
    }
}
export const purchaseBurger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBurgerStart());
        axios.post('/orders.json',orderData).then(response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData));
            /*alert('Continue success');
            this.setState({
                loading : false
            });
            this.props.history.push('/');*/

        }).catch(errors => {
            dispatch(purchaseBurgerFail(errors));
            /*alert('Continue failed');
            this.setState({
                loading : false
            });*/
        })
    }
}