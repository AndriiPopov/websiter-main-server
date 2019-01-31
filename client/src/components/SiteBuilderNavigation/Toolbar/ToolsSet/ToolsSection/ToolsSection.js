import React from 'react';
import PropTypes from 'prop-types';

import classes from './ToolsSection.module.css';

export const ToolsSection = props => {
    return (
        <td className={classes.Section}>
            <div className={classes.ContentDiv}>
                <table className={classes.ContentTable}>
                    <tbody>
                        <tr>
                            {props.children}
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className={classes.TitleDiv}>
                {props.label}
            </div>
        </td>
    );
};

ToolsSection.propTypes = {
    label: PropTypes.string
};

export default ToolsSection;