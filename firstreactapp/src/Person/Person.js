import React from 'react';
import './Person.css';
import Radium from 'radium'

const person = (props) => {

    const style = {
        '@media (min-width : 500px)' : {
            width:'450px'
        }
    };

    return <div className="Person" style={style}>
        Personal Information.
        <br/> 
        <br/>
        <p onClick={props.handler.bind(this,'Rahul')}>Name : {props.name}</p> 
        <p onClick={props.deleteHandler}>Age  :<b>{Math.floor(Math.random() * 30)}</b> Years Old.</p>
        <p>{props.children}</p>
        <input type="text" onChange={props.change} defaultValue={props.name}/>
        </div>
};

export default Radium(person);