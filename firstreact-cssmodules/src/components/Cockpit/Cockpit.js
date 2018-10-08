import React from 'react'

const cockpit = (props) =>{
    return (
        <div>
        <h1>This is my first react application.</h1>
        <button  onClick={props.showPersonHandler}>Show Person</button>&nbsp;
        <button  onClick={props.authenticatedHandler}>Log In</button>&nbsp;
        </div>
    );
}

export default cockpit;