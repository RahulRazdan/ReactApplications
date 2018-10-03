import React from 'react';
import classes from './Person.css';

const person = (props) => {

    return <div className={classes.Person}>
        Personal Information.
        <br/> 
        <br/>
        <p onClick={props.handler.bind(this,'Rahul')}>Name : {props.name}</p> 
        <p onClick={props.deleteHandler}>Age  :<b>{Math.floor(Math.random() * 30)}</b> Years Old.</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.change} defaultValue={props.name}/>
        </div>
};

export default person;