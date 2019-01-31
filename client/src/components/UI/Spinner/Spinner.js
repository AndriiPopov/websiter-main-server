import React from 'react';
import classes from './Spinner.module.css';
import Aux from '../../../hoc/Aux';

const spinner = props => (
    <Aux>
        {props.cover ? 
            <div className={classes.Cover}>
                <div className={classes.Loader}>Loading...</div>
            </div> 
            :  <div className={classes.Loader}>Loading...</div> 
        }
       
    </Aux>
);

export default spinner;