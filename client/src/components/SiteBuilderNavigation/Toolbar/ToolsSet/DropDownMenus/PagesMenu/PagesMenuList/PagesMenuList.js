import React, { Component } from 'react';
import { connect } from 'react-redux';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import Sortly from 'react-sortly';

import * as actions from '../../../../../../../store/actions/index';

class PagesMenuList extends Component {
    handleChange = items => {
        this.props.savePagesStructure(this.props.websiteId, items);
    }
        
    render () {
        const ItemRenderer = props => {
            const {
                name, path, connectDragSource, connectDropTarget, 
                isDragging, isClosestDragging, id
            } = props;
            const style = {
                border: '1px solid #ccc',
                cursor: 'move',
                padding: 10,
                marginBottom: 4,
                ...(isDragging || isClosestDragging ? { opacity: 0.3 } : null),
                margin: 10,
                marginLeft: 10 + path.length * 50,
                width: 300,
                outline: this.props.currentPage === id ? '1px solid blue' : null
            };
    
            const el = <div 
                style={style}
                onMouseDown={() => this.props.setCurrentPageMain(id, this.props.pagesObjects)}>
                    {name}
                </div>;
            return connectDragSource(connectDropTarget(el));
        };

        return (
            <Sortly 
                items={this.props.items} 
                itemRenderer={ItemRenderer}
                onChange={this.handleChange} />
        );
    };
};

const mapStateToProps = state => {
    return {
        websiteId: state.website._id,
        pagesObjects: state.website.pagesObjects
    }
}

const mapDispatchToProps = dispatch => {
    return {
        setCurrentPageMain: (_id, pagesObjects) => dispatch(actions.setCurrentPageMain(_id, pagesObjects)),
        savePagesStructure: (_id, pagesStructure) => dispatch(actions.savePagesStructure(_id, pagesStructure))
    }
};

export default DragDropContext(HTML5Backend)( connect(mapStateToProps, mapDispatchToProps)(PagesMenuList));