import React from 'react'

function InputField(props) {
    return (
        <div>
            <input 
             className="inputfield"
             id={props.id}
            type={props.type} 
            value={props.value}
            onChange={props.change}
            placeholder={props.placeholder}
            //prefix={props.startAdornment}
    >
       
    </input>
        </div>
    )
}

export default InputField
