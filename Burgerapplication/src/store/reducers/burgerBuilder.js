import * as actionTypes from '../actions/actionTypes'
import {updateObject} from '../Utility';

const initialState = {
    ingredients : null,
    totalPrice : 4,
    errors : false,
    building : false
};

const INGREDIENT_PRICES = {
    salad :0.5,
    bacon :0.7,
    meat : 1.3,
    cheese : 0.4
};

const addIngredient = (state,action) => {
    const updatedIngredient = {[action.ingredientName] : state.ingredients[action.ingredientName] + 1 };
    const updatedIngredients = updateObject(state.ingredients,updatedIngredient);
    const updatedState = {
        ingredients : updatedIngredients,
        totalPrice : state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state,updatedState);
}

const removeIngredient = (state,action) => {
    const updatedIng = {[action.ingredientName] : state.ingredients[action.ingredientName] - 1 };
    const updatedIngrts = updateObject(state.ingredients,updatedIng);
    const updatedStt = {
        ingredients : updatedIngrts,
        totalPrice : state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
        building : true
    }
    return updateObject(state,updatedStt);
}
const setIngredient = (state,action) => {
    const updatedIngredientsSet = {
        ingredients : action.ingredients,
        totalPrice : 4,
        errors: false,
        building : false
    }
    return updateObject(state,updatedIngredientsSet);
}
const reducer = (state = initialState,action) => {
    switch(action.type){        
        case actionTypes.FETCH_INGREDIENT_FAILED : return  updateObject(state,{errors : true});
        case actionTypes.SET_INGREDIENTS : return setIngredient(state,action);
        case actionTypes.ADD_INGREDIENT : return addIngredient(state,action);
        case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);           
        default :
    }
    return state;
}

export default reducer;