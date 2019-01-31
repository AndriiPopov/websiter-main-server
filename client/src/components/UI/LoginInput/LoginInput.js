import React from 'react';

import classes from './LoginInput.module.css';

const LoginInput = props => {
    const inputClasses = [classes.InputElement];

    if (props.invalid && props.shouldValidate && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    let type = props.type;
    if(props.passwordVisible) {
        type = 'text';
    }

    const passwordToggle = props.password ? 
        <div
            onClick={props.togglePasswordVisible} 
            className={props.passwordVisible ? classes.PasswordIsVisible : classes.PasswordIsHidden}/>
        : null;

    return (
        <div className={classes.Input}>
            <label className={classes.Label}>{props.label}</label>
            <input 
                className={inputClasses.join(' ')}                
                type={type}
                placeholder={props.placeholder}
                value={props.value}
                onChange={props.changed} />
            {passwordToggle}
        </div>
    );
};

export default LoginInput;