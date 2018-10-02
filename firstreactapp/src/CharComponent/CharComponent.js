import React from 'react'
import './char.css'

const char = (props) =>{
    return <div className="char" onClick={props.deleteHandler}> {props.char} </div>
}

export default char;