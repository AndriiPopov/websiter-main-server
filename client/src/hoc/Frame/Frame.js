import React, { Component } from 'react';
import { createPortal } from 'react-dom';

import classes from './Frame.module.css';

export class Frame extends Component {
    constructor(props) {
        super(props);
    
        this.setContentRef = node => {
            this.contentRef = ((!node || !node.contentWindow) && null) || node.contentWindow.document.body;
        }
    }

    componentDidMount() {
        this.forceUpdate();
        this.contentRef.style.margin = '0px';
        this.contentRef.appendChild(document.getElementById('emotionBuilderFrame'));
    }
    
    render() {
        const { children, ...props } = this.props;
        return (
            <iframe 
                {...props} 
                ref={this.setContentRef}
                title="MainFrame"
                className={classes.Frame}>
                {this.contentRef && createPortal(React.Children.only(children), this.contentRef)}
            </iframe>
        )
    }
}

export default Frame;