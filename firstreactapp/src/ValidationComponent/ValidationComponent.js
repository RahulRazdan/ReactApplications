import React from 'react'

const validation = (props) => {

    let output = 'Text too short';

    if(props.inputLength > 5 )
        output = 'Text long enough';
        
    return <div>
    {output}
    </div>
}

export default validation;