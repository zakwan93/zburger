import React from 'react';
import Classes from './Button.css';

const button = (props) => (
    <button className = { [Classes.Button, Classes[props.btnType]].join(' ') }
        onClick={props.clicked} > 
        {props.children} 
    </button>
);

export default button;