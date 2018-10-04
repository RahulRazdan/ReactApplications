import React,{Component} from 'react';
import classes from './Person.css';

class Person extends Component {
    constructor(props){
        super(props);
        console.log('Inside Person.js constructor');
      }
    
      componentWillMount(){
        console.log('Inside componentWillMount of Person.js')
      }
    
      componentDidMount(){
        console.log('inside componentDidMount method of Person class.');
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
    <p onClick={this.props.handler.bind(this,'Rahul')}>Name : {this.props.name}</p> 
    <p onClick={this.props.deleteHandler}>Age  :<b>{Math.floor(Math.random() * 30)}</b> Years Old.</p>
    <p>{this.props.children}</p>
    <input type="text" onChange={this.props.change} defaultValue={this.props.name}/>
    </div>
    }
}

export default Person;