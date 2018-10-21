import React , {Component} from 'react'
import Input from '../../components/UI/Input/Input'
import Button from '../../components/UI/Button/Button'
import classes from './Auth.module.css';
import * as authActions from '../../store/actions/auth';
import {connect} from 'react-redux';
import Spinner from '../../components/UI/Spinner/Spinner'
import {Redirect} from 'react-router-dom';
import {checkValidity} from '../../store/Utility';

class Auth extends Component {

    state = {
        controls : {
            email : {
                elementType : 'input',
                elementConfig : {
                    type:'email',
                    placeholder : 'Username/Email'
                },
                value : '',
                validation : {
                    required : true
                },
                valid : false,
                touched : false
            },
            password : {
                elementType : 'input',
                elementConfig : {
                    type:'password',
                    placeholder : 'Password'
                },
                value : '',
                validation : {
                    required : true,
                    minLength : 7
                },
                valid : false,
                touched : false
            }
        },
        formIsValid : false,
        isSignUp : true
    }

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedForm = {
            ...this.state.controls
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

        this.setState({
            controls : updatedForm,
            formIsValid : isFormValid   
        });
    }

    switchToAuthHandler = () =>{
        this.setState(preState => {
            return {isSignUp : !preState.isSignUp};
        })
    }
    submitHandler = (event) => {
        event.preventDefault();
        this.props.onSubmitAction(this.state.controls.email.value,this.state.controls.password.value,this.state.isSignUp);
    }

    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !== '/')
            this.props.onsetRedirectPath();
    }
    render(){
        let formArray = [];
        for(let key in this.state.controls){
            formArray.push({
                id : key,
                config:this.state.controls[key]
            });
        }

        const form = formArray.map(element => (
            <Input key={element.id} elementType={element.config.elementType} 
                elementConfig={element.config.elementConfig} shouldValidate={element.config.validation}
                defaultValue={element.config.value} valid={element.config.valid} touched={element.config.touched}
                changed={(event) => this.inputChangedHandler(event,element.id)}/> 
        ));

        let body = (
            <form onSubmit={this.submitHandler}>
                {form}
                <Button disabled={!this.state.formIsValid} btnType='Success'>SUBMIT</Button>
            </form>
        );

        if(this.props.loading){            
            body = <Spinner/>;
        }

        let errorMessage = null;

        if(this.props.error){
            
            errorMessage = (
                <p style={{'color':'red'}}>
                    {this.props.error.message}
                </p>
            );
        }

        let isAuth = null;
        if(this.props.isAuthenticate){
            isAuth = <Redirect to={this.props.authRedirectPath}/>
        }
        return (
            <div className={classes.Auth}>
            {isAuth}
            {errorMessage}
            {body}
            <Button clicked={this.switchToAuthHandler} btnType='Danger'>Switch to {this.state.isSignUp ? "SignIn" : "SignUp"}</Button>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading : state.auth.loading,
        error : state.auth.error,
        isAuthenticate : state.auth.token !== null,
        authRedirectPath : state.auth.authRedirectPath,
        buildingBurger : state.burgerBuilder.building
    }
}
const mapDispatchToProps = dispatch =>{
    return {
        onSubmitAction : (email,password,isSignUp) => dispatch(authActions.auth(email,password,isSignUp)),
        onsetRedirectPath : () => dispatch(authActions.setAuthRedirectPath('/'))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Auth);