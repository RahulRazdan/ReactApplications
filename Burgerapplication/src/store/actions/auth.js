import * as actionTypes from './actionTypes';
import axios from 'axios'

const authStart = () => {
    return {
        type:actionTypes.AUTH_START
    }
};

const authSuccess = (permissions) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        token : permissions.idToken,
        userId : permissions.localId
    }
}

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        errors : error
    }
}

export const logout = () =>{
    localStorage.removeItem('token');
    localStorage.removeItem('expirationTime');
    localStorage.removeItem('localId');
    return {
        type : actionTypes.AUTH_LOGOUT
    }
}

export const setAuthRedirectPath = (path) =>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path : path
    }
}
const authAuthTimeout = (expireTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        },expireTime * 1000);
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if(!token){
            dispatch(logout())
        }else {
            const expirationTime = new Date(localStorage.getItem('expirationTime'));
            if(expirationTime > new Date()){
                const localId = localStorage.getItem('localId');
                dispatch(authSuccess({
                    idToken : token,
                    localId : localId
                }));
                dispatch(authAuthTimeout((expirationTime.getTime() - new Date().getTime())/1000));
            }else {
                dispatch(logout())
            }
            
        }
    }
}
export const auth= (email,password,isSignUp) =>{
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email : email,
            returnSecureToken : true,
            password : password
        }
        let url = 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDdGU4HmARwhx5YdTiCkTGMmnepqjaluuo';
        if(!isSignUp){
            url= 'https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDdGU4HmARwhx5YdTiCkTGMmnepqjaluuo'
        }
        axios.post(url,authData)
        .then(res => {
            localStorage.setItem('token',res.data.idToken);
            localStorage.setItem('expirationTime',new Date( new Date().getTime() + (res.data.expiresIn * 1000)))
            localStorage.setItem('localId',res.data.localId);
            dispatch(authSuccess(res.data));
            dispatch(authAuthTimeout(res.data.expiresIn));
        })
        .catch(error => {
            dispatch(authFail(error.response.data.error));
        })
    };
};