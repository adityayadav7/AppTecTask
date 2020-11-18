import React from 'react'
import Button from '@material-ui/core/Button';

function FormButton(props) {
    return (
        <div>
          <Button
           variant="contained" color="primary"
           //color={props.color}
           onClick={props.click}
           //label={props.label}
          >{props.label}</Button>
        </div>
    )
}

export default FormButton;
