import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../Utility';

const initialState ={
    token : null,
    userId : null,
    loading : false,
    error : null,
    authRedirectPath : '/'
}

const authSuccess = (state,action) => {
    const authData = {
        token : action.token,
        userId : action.userId,
        loading : false,
        error : null
    }
    return updateObject(state,authData);
}

const reducer = (state = initialState , action ) => {
    switch(action.type){
        case actionTypes.AUTH_START : return updateObject(state,{error:null,loading : true});
        case actionTypes.AUTH_SUCCESS : return authSuccess(state,action);
        case actionTypes.AUTH_FAIL : return updateObject(state,{error:action.errors,loading : false});
        case actionTypes.AUTH_LOGOUT : return updateObject(state,{token:null,userId:null});
        case actionTypes.SET_AUTH_REDIRECT_PATH : return updateObject(state,{authRedirectPath : action.path});
        default : return state;
    }
}

export default reducer;