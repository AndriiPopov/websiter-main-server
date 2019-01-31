import React from 'react';

import classes from './ToolsBlock.module.css';

export const toolsBlock = props => {
    return (
        <td className={classes.Block}>
            {props.children}
        </td>
    );
};

export default toolsBlock;