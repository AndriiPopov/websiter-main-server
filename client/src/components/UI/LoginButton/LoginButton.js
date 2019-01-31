import React from 'react';
import classes from './LoginButton.module.css';

const LoginButton = props => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        onClick={props.clicked}>
        {props.children}
    </button>
);

export default LoginButton;