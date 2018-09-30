import React from 'react'

const userInput = (props) =>{
    return <div>
        <input style = {props.InputStyle} type="text" onChange={props.change}/>
    </div>
}

export default userInput;