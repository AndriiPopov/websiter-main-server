/*
    This creates drag controls for box and handles drags.
    There are 5 controls: drag, left, right, top, bottom.
    Drag is handled with Dragstart function and magnetize to closest elements
    Drag can be done on multiple elements. Their start values are imported from reducer in startValues and modified values are passed in valueItems
*/

import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as classes from './BoxControls.css.js';
import * as actions from '../../../store/actions/index';
import Aux from '../../../hoc/Aux';
import { dragStart } from '../../../utils/dragFunction';
import { updateScrElPos, magnetizeOnElementDrag } from '../../../utils/elementMagneticDrag.js';
import MagneticDragHighlight from './MagneticDragHighlight/MagneticDragHighlight.js';
import getCombinedStyle from '../../../utils/getCombinedStyle';

export class BoxControls extends Component {
    state = {
        highlightElementH: null,
        highlightLineH: null,
        highlightElementV: null,
        highlightLineV: null
    };

    saveHighlightInState = newValues => {
        this.setState({
            highlightElementH: newValues.highlightElementH,
            highlightLineH: newValues.highlightLineH,
            highlightElementV: newValues.highlightElementV,
            highlightLineV: newValues.highlightLineV
        });
    };

    removeHighlightInState = () => {
        this.setState({
            highlightElementH: null,
            highlightLineH: null,
            highlightElementV: null,
            highlightLineV: null
        });
    };

    handleDragMouseDown = e => {
        e.stopPropagation();
        const styleEl = getCombinedStyle(this.props.box, this.props.styles, this.props.hoveredElement, this.props.activeElement);
        this.props.chooseBox(this.props.id, e.ctrlKey);
        let elementsPositions = [];
        const startElX = styleEl.left;
        const startElY = styleEl.top;
        let lastMagneticChangeX = 0;
        let lastMagneticChangeY = 0;
        let hasBeenMoved = false;
        let startValues = [];
        let firstTime = true;

        dragStart(e, (difX, difY, relX, relY) => {
            const newValues = magnetizeOnElementDrag (elementsPositions, 'drag', this.props.id,
                startElX + difX, null, startElY + difY, null,
                relX, relY,
                lastMagneticChangeX, lastMagneticChangeY );

            lastMagneticChangeX = newValues.changeX;
            lastMagneticChangeY = newValues.changeY;

            if (firstTime) {
                startValues = [...this.props.startValues];
                elementsPositions = updateScrElPos(this.props.chosenBoxes);
                firstTime = false;
            }
            const valueItems = [];
            startValues.forEach( startValue => {
                valueItems.push({
                    item: startValue.box,
                    values: [
                        {   key: 'left',
                            value: startValue.left + difX - lastMagneticChangeX
                        },{ key: 'top',
                            value: startValue.top + difY - lastMagneticChangeY
                        }
                    ]
                });
            });
            this.props.changed(null, null, true, valueItems);

            this.saveHighlightInState(newValues);
            hasBeenMoved = true;
        }, () => {
            this.removeHighlightInState();
            if (hasBeenMoved) {
                this.props.saveToHistory();
            }
        });
    };

    handleLeftMouseDown = e => {
        e.stopPropagation();
        const styleEl = getCombinedStyle(this.props.box, this.props.styles, this.props.hoveredElement, this.props.activeElement);
        const startElX = styleEl.left;
        let lastMagneticChangeX = 0;
        let elementsPositions = [];
        let startValues = [];
        let firstTime = true;

        dragStart(e, (difX, difY, relX, relY ) => {
            const newValues = magnetizeOnElementDrag (elementsPositions, 'left', this.props.id,
                startElX + difX, null, null, null,
                relX, relY,
                lastMagneticChangeX, null );

            lastMagneticChangeX = newValues.changeX;

            if (firstTime) {
                startValues = [...this.props.startValues];
                elementsPositions = updateScrElPos(this.props.chosenBoxes);
                firstTime = false;
            }
            const valueItems = [];
            startValues.forEach( startValue => {
                let valueW = startValue.width - difX + newValues.changeX;
                let valueX = startValue.left + difX - lastMagneticChangeX;
                if (valueW < 5) {
                    valueX = startValue.left + startValue.width - 5;
                    valueW = 5;
                }

                valueItems.push({
                    item: startValue.box,
                    values: [
                        {   key: 'left',
                            value: valueX
                        },{ key: 'width',
                            value: valueW
                        }
                    ]
                });
            });
            this.props.changed(null, null, true, valueItems);

            this.saveHighlightInState(newValues);
        }, () => {
            this.removeHighlightInState();
            this.props.saveToHistory();
        });
    };

    handleTopMouseDown = e => {
        e.stopPropagation();
        const styleEl = getCombinedStyle(this.props.box, this.props.styles, this.props.hoveredElement, this.props.activeElement);
        const startElY = styleEl.top;
        let lastMagneticChangeY = 0;
        let elementsPositions = [];
        let startValues = [];
        let firstTime = true;

        dragStart(e, (difX, difY, relX, relY ) => {
            const newValues = magnetizeOnElementDrag (elementsPositions, 'top', this.props.id,
                null, null, startElY + difY, null,
                relX, relY,
                null, lastMagneticChangeY );

            lastMagneticChangeY = newValues.changeY;

            if (firstTime) {
                startValues = [...this.props.startValues];
                elementsPositions = updateScrElPos(this.props.chosenBoxes);
                firstTime = false;
            }
            const valueItems = [];
            startValues.forEach( startValue => {
                let valueH = startValue.height - difY + newValues.changeY;
                let valueY = startValue.top + difY - lastMagneticChangeY;
                if (valueH < 5) {
                    valueY = startValue.top + startValue.height - 5;
                    valueH = 5;
                }
                valueItems.push({
                    item: startValue.box,
                    values: [
                        {   key: 'top',
                            value: valueY
                        },{ key: 'height',
                            value: valueH
                        }
                    ]
                });
            });
            this.props.changed(null, null, true, valueItems);
            
            this.saveHighlightInState(newValues);
        }, () => {
            this.props.saveToHistory();
            this.removeHighlightInState();
        });
    };

    handleRightMouseDown = e => {
        e.stopPropagation();
        const styleEl = getCombinedStyle(this.props.box, this.props.styles, this.props.hoveredElement, this.props.activeElement);
        const startElX = styleEl.left;
        let lastMagneticChangeX = 0;
        let elementsPositions = [];
        let startValues = [];
        let firstTime = true;

        dragStart(e, (difX, difY, relX, relY ) => {
            const newValues = magnetizeOnElementDrag (elementsPositions, 'right', this.props.id,
                null, startElX + difX, null, null,
                relX, relY,
                lastMagneticChangeX, null );

            lastMagneticChangeX = newValues.changeX;

            if (firstTime) {
                startValues = [...this.props.startValues];
                elementsPositions = updateScrElPos(this.props.chosenBoxes);
                firstTime = false;
            }
            const valueItems = [];
            startValues.forEach( startValue => {
                let valueW = startValue.width + difX - newValues.changeX;
                let valueX = startValue.left + difX - lastMagneticChangeX;
                if (valueW < 5) {
                    valueW = 5;
                }

                valueItems.push({
                    item: startValue.box,
                    values: [
                        {   key: 'right',
                            value: valueX
                        },{ key: 'width',
                            value: valueW
                        }
                    ]
                });
            });
            this.props.changed(null, null, true, valueItems);

            this.saveHighlightInState(newValues);
        }, () => {
            this.props.saveToHistory();
            this.removeHighlightInState();
        });
    };

    handleBottomMouseDown = e => {
        e.stopPropagation();
        const styleEl = getCombinedStyle(this.props.box, this.props.styles, this.props.hoveredElement, this.props.activeElement);
        const startElY = styleEl.bottom;
        let lastMagneticChangeY = 0;
        let elementsPositions = [];
        let startValues = [];
        let firstTime = true;

        dragStart(e, (difX, difY, relX, relY ) => {
            const newValues = magnetizeOnElementDrag (elementsPositions, 'bottom', this.props.id,
                null, null, null, startElY + difY,
                relX, relY,
                null, lastMagneticChangeY );

            lastMagneticChangeY = newValues.changeY;

            if (firstTime) {
                startValues = [...this.props.startValues];
                elementsPositions = updateScrElPos(this.props.chosenBoxes);
                firstTime = false;
            }
            const valueItems = [];
            startValues.forEach( startValue => {
                let valueH = startValue.height + difY - newValues.changeY;
                let valueY = startValue.top + difY - lastMagneticChangeY;
                if (valueH < 5) {
                    valueH = 5;
                }

                valueItems.push({
                    item: startValue.box,
                    values: [
                        {   key: 'bottom',
                            value: valueY
                        },{ key: 'height',
                            value: valueH
                        }
                    ]
                });
            });
            this.props.changed(null, null, true, valueItems);
            
            this.saveHighlightInState(newValues);
        }, () => {
            this.props.saveToHistory();
            this.removeHighlightInState();
        });
    };

    render () {
        const drag = !this.props.enteredBoxes.includes(this.props.id) ? (
            <Aux>
                <div style={classes.BoxDrag}
                    onMouseDown={this.handleDragMouseDown}
                    onDoubleClick={() => this.props.enterBox()} ></div>
                {this.state.highlightLineH ? <MagneticDragHighlight 
                    line={this.state.highlightLineH}
                    element={this.state.highlightElementH} /> : null}
                {this.state.highlightLineV ? <MagneticDragHighlight 
                    line={this.state.highlightLineV}
                    element={this.state.highlightElementV} /> : null}
            </Aux>
        ) : null;

        const sideDrags = this.props.chosenBoxes.includes(this.props.id) ? (
            <Aux>
                <div style={classes.BoxResizeLeft}
                    onMouseDown={this.handleLeftMouseDown}></div>
                <div style={classes.BoxResizeRight}
                    onMouseDown={this.handleRightMouseDown}></div>
                <div style={classes.BoxResizeTop}
                    onMouseDown={this.handleTopMouseDown}></div>
                <div style={classes.BoxResizeBottom}
                    onMouseDown={this.handleBottomMouseDown}></div>
            </Aux>
        ) : null;

        let controls = (
            <Aux>
                {drag}
                {sideDrags}
            </Aux>
        );
        if (this.props.previewIsOn) {
            controls = null;
        }
        return controls;
    }
};

BoxControls.propTypes = {
    id: PropTypes.string.isRequired,
    chosenBoxes: PropTypes.arrayOf(PropTypes.string),
    enteredBoxes: PropTypes.arrayOf(PropTypes.string),
    box: PropTypes.shape({
        type: PropTypes.oneOf(['box', 'text']).isRequired,
        height: PropTypes.number.isRequired,
        width: PropTypes.number.isRequired,
        left: PropTypes.number.isRequired,
        top: PropTypes.number.isRequired,
        zIndex: PropTypes.number.isRequired,
        children: PropTypes.arrayOf(PropTypes.string).isRequired,
        parent: PropTypes.string.isRequired,
        styles: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    hoveredElement: PropTypes.string,
    activeElement: PropTypes.string,
    styles: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['hover', 'active']).isRequired,
        influencer: PropTypes.string.isRequired
    })).isRequired,
    startValues: PropTypes.arrayOf(PropTypes.shape({
        box: PropTypes.string.isRequired,
        width: PropTypes.number,
        height: PropTypes.number,
        left: PropTypes.number,
        right: PropTypes.number,
        top: PropTypes.number,
        bottom: PropTypes.number
    })).isRequired
};

const mapStateToProps = (state, props) => {
    return {
        chosenBoxes: state.builder.present.chosenBoxes,
        enteredBoxes: state.builder.present.enteredBoxes,
        box: state.builder.present[props.id],
        hoveredElement: state.builder.present.hoveredElement,
        activeElement: state.builder.present.activeElement,
        styles: state.builder.present[props.id].styles.map( style => 
            state.builder.present[style] ),
        startValues: state.builder.present.boxesDragStartValues,
        previewIsOn: state.builder.present.preview
    };
};

const mapDispatchToProps = dispatch => {
    return {
        changed: (newValue, valueKey, isNotForHistory, itemValues) => dispatch(actions.changeElementPropertyValue(newValue, valueKey, false, isNotForHistory, itemValues)),
        chooseBox: (id, ctrl) => {dispatch(actions.chooseBox(id, ctrl))},
        enterBox: () => {dispatch(actions.enterBox())},
        saveToHistory: () => {dispatch(actions.saveToHistory())}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(BoxControls);