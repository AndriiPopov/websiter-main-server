import React from 'react';
import { connect } from 'react-redux';
import { Global } from '@emotion/core';
//import ReactPlayer from 'react-player';
import PropTypes from 'prop-types';
//import { createEmotionInIframe } from '../../emotion-builder';

import * as actions from '../../../store/actions/index';
import * as classes from './Box.css.js';
import BoxControls from '../../../components/BuilderControls/BoxControls/BoxControls.js';
import getCombinedStyle from '../../../utils/getCombinedStyle';
import Text from './Text/Text';


const _Box = props => {
    const determineStyleForState = el => {
        const boxShadow = 
            (el.borderHOffset ? el.borderHOffset + 'px ' : '0px ') + 
            (el.borderVOffset ? el.borderVOffset + 'px ' : '0px ') + 
            (el.borderBlur ? el.borderBlur + 'px ' : '0px ') + 
            (el.borderSize ? el.borderSize + 'px ' : '0px ') + 
            (el.borderColor ? el.borderColor : 'rgba(0, 0, 0, 1)');

        let outline = !props.previewIsOn ? 'grey dashed 2px' : null;
        if(props.id === props.hoveredElement) {
            outline = 'rgba(20, 160, 250, .8) solid 10px';
        }

        if(props.id === props.activeElement) {
            outline = 'rgba(250, 160, 20, .8) solid 10px';
        }

        return {
            userSelect: 'none',
            boxSizing: 'border-box',
            position: 'absolute',
            left: el.left,
            top: el.top,
            width: el.width,
            height: el.height,
            zIndex: el.zIndex,
            outline: outline,
            background: el.backgroundOn ? el.background : null,
            boxShadow: el.borderOn ? boxShadow : null
        };
    }

    const el = props.box;
    const styles = {};
    let map;

    if (el) {
        const styleEl = getCombinedStyle(el, props.styles, props.hoveredElement, props.activeElement);
        let combinedStyle = determineStyleForState(styleEl);
        styles['#' + props.id + '_out'] = combinedStyle;

        //  USE WHEN PREVIEW
        // props.styles.forEach( style => {
        //     styles['#' + style.influencer + ':' + style.type + ' #' + props.id + '_out']  = {
        //         left: style.left,
        //         top: style.top,
        //     };
        // });

        if (el.mapOn) {        
            let src = 'https://www.google.com/maps/embed/v1/search';
            src += '?key=AIzaSyCUFx8cfHIz2hoYa49UDmZt2Ab1JqmUYZ4&q=';
            src += el.mapAddress || 'The US';
            src += el.mapZoom ? '&zoom=' + el.mapZoom : '';
            src += el.mapSatellite ? '&maptype=satellite' : '&maptype=roadmap';
            map = <iframe 
                title={props.id + '_map'}
                style={classes.BoxMapIframe} 
                frameBorder="0" 
                src={src.replace(/ /g, '+')} />;
        }

        // let video;
        // if (el.video) {
        //     video = <ReactPlayer
        //         />;
        // }   
    }

    const text = el.type === 'text' ? 
        <Text 
            id={props.id}  
            handleChooseTextEditor={props.handleChooseTextEditor} /> 
        : null;

    return (
        <div id={props.id + '_out'}
            onMouseDown={(e) => props.deselectInner(e, props.id)}>
            {map}
            <div style={classes.BoxInner}
                id={props.id}
                name="keyElement" >
                {text}
                {el.children.map(box => (
                    <Box 
                        key={box} 
                        id={box}
                        handleChooseTextEditor={props.handleChooseTextEditor} />
                ))}
            </div>
            <BoxControls id={props.id}/>
            <Global styles={styles} />
        </div>
    );
};

_Box.propTypes = {
    box: PropTypes.shape({
        type: PropTypes.oneOf(['box', 'text']).isRequired,
        children: PropTypes.arrayOf(PropTypes.string).isRequired,
        parent: PropTypes.string.isRequired
    }),
    hoveredElement: PropTypes.string,
    activeElement: PropTypes.string,
    styles: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['hover', 'active']).isRequired,
        influencer: PropTypes.string.isRequired
    })).isRequired
};

const mapStateToProps = (state, props) => {
    return {
        box: state.builder.present[props.id],
        hoveredElement: state.builder.present.hoveredElement,
        activeElement: state.builder.present.activeElement,
        styles: state.builder.present[props.id].styles.map( style => state.builder.present[style] ),
        previewIsOn: state.builder.present.preview        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deselectInner: (e, item) => dispatch(actions.deselectInner(e, item))
    };
};

const Box = connect(mapStateToProps, mapDispatchToProps)(_Box);

export default Box;