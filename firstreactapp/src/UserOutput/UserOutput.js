import React from 'react'
import './UserOutput.css';

const userOutput = (props) =>{
    return <div className="Output">
        <p>
            Hi, My Name is {props.username}
        </p>
        <p>
            I love {props.love} :) 
        </p>
    </div>
}

export default userOutput;