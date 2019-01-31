import React, { Component } from 'react';
import PropTypes from 'prop-types';

import classes from './DropDownMenu.module.css';

class dropDownMenu extends Component {
    constructor(props) {
        super(props);
        this.dropDownDiv = React.createRef();
    }

    setDropDownHeight = () => {
        const topDifference = this.props.isTopMenu ? 0 : 56;
        const dropDown = this.dropDownDiv.current;
        const buttonRect = dropDown.previousSibling.getBoundingClientRect();
        const height = document.documentElement.clientHeight;
        const width = document.documentElement.clientWidth;
        dropDown.style.top = buttonRect.bottom - topDifference + 'px';
        const rect = dropDown.getBoundingClientRect();
        if (rect.bottom > height){
            if (height - (rect.bottom - rect.top) - (rect.bottom - rect.top)>10)
                dropDown.style.top = height - (rect.bottom - rect.top) - (rect.bottom - rect.top) - topDifference + 'px';
        else
            dropDown.style.height = height - rect.top + 'px';
        }
        //dropDown.style.width = rect.right - rect.left + 'px';
        if (rect.right > width) {
            if (width - (rect.right - rect.left) > 0)
                dropDown.style.left = width - (rect.right - rect.left) + 'px';
            else
                dropDown.style.left = '0px';
        }
    }

    componentDidMount () {
        this.setDropDownHeight();
    }

    render () {
        return (
            <div className={ classes.DropDownMenuDiv }
                style={{minWidth: this.props.width + 'px'}}
                ref={this.dropDownDiv}>
                <div 
                    className={classes.Cover} 
                    onClick={this.props.close} />
                <div className={classes.MenuDiv}>
                    {this.props.children}
                </div>
            </div>
        );
    }
}

dropDownMenu.propTypes = {
    close: PropTypes.func.isRequired
};

export default dropDownMenu;