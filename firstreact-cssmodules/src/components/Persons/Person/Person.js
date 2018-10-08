import React,{Component} from 'react';
import classes from './Person.css';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../containers/App'

class Person extends Component {
    constructor(props){
        super(props);
        console.log('Inside Person.js constructor');
        this.inputElement = React.createRef();
      }
    
      componentWillMount(){
        console.log('Inside componentWillMount of Person.js')
      }
    
      componentDidMount(){
        console.log('inside componentDidMount method of Person class.');
        if(this.props.index === 0)
          this.inputElement.current.focus();
      }

      componentWillUnmount(){
        console.log('inside componentWillUnmount method of Person class.');
      }
    render () {
        console.log('inside render method of class person');
    return <div className={classes.Person}>
    Personal Information.
    <br/> 
    <br/>
    <AuthContext.Consumer >
      {auth => auth ? <p>I'm Authenticated</p>:null}
    </AuthContext.Consumer>
    <p onClick={this.props.handler.bind(this,'Rahul')}>Name : {this.props.name}</p> 
    <p onClick={this.props.deleteHandler}>Age  :<b>{Math.floor(Math.random() * 30)}</b> Years Old.</p>
    <p>{this.props.children}</p>
    <input type="text" ref={this.inputElement} position={this.props.index} onChange={this.props.change} defaultValue={this.props.name}/>
    </div>
    }
}

Person.PropTypes = {
    name : PropTypes.string
};

export default Person;