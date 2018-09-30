import React from 'react';

const person = () => {
    return <p>
        Person Information.
        <br/> 
        <b>{Math.floor(Math.random() * 30)}</b> Years Old.
        </p>
};

export default person;