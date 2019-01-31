import React from 'react';
import { connect } from 'react-redux';
import { Global } from '@emotion/core';
import PropTypes from 'prop-types';

import Box from '../Box/Box';
import * as classes from './Section.css.js';
import * as actions from '../../../store/actions/index';
import ControlSectionDrag from '../../../components/BuilderControls/SectionControls/ControlSectionDrag/ControlSectionDrag';
import ControlSectionHeight from '../../../components/BuilderControls/SectionControls/ControlSectionHeight/ControlSectionHeight';
import ControlSectionSpace from '../../../components/BuilderControls/SectionControls/ControlSpaceSection/ControlSectionSpace';
import getCombinedStyle from '../../../utils/getCombinedStyle';

const Section = props => {
    const determineStyleForState = el => {
        let outline = '';
        if(props.id === props.hoveredElement) {
            outline = 'rgba(20, 160, 250, .8) solid 10px';
        }

        if(props.id === props.activeElement) {
            outline = 'rgba(250, 160, 20, .8) solid 10px';
        }

        return {
            ['#' + props.id + '_space']: {
                userSelect: 'none',
                height: parseInt(el.height) + parseInt(props.section.space) 
            },
            ['#' + props.id + '_height']: {
                userSelect: 'none',
                height: el.height,
                background: el.outerBackgroundOn ? el.outerBackground : null,
                position: 'relative'
            },
            ['#' + props.id + '_width']: {
                userSelect: 'none',
                position: 'relative',
                height: '100%',
                width: '1000px',
                margin: 'auto',
                outline: outline,
                background: el.backgroundOn ? el.background : null
            }
        };
    };

    const el = props.section;
    let styles = {};
    let map;
    if (el) {
        const styleEl = getCombinedStyle(el, props.styles, props.hoveredElement, props.activeElement);
        styles = determineStyleForState(styleEl);

        if (el.mapOn) {        
            let src = 'https://www.google.com/maps/embed/v1/search';
            src += '?key=AIzaSyCUFx8cfHIz2hoYa49UDmZt2Ab1JqmUYZ4&q=';
            src += el.mapAddress || 'The US';
            src += el.mapZoom ? '&zoom=' + el.mapZoom : '';
            src += el.mapSatellite ? '&maptype=satellite' : '&maptype=roadmap';
            map = <iframe 
                title={props.id + '_map'}
                style={classes.SectionMapIframe} 
                frameBorder="0" 
                src={src.replace(/ /g, '+')} />;
        }
    }
    
    // This is for preview

    // props.styles.forEach( style => {
    //     styles['#' + style.influencer + ':' + style.type + ' #' + props.id + '_out']  = {
    //         left: style.left,
    //         top: style.top,
    //     };
    // });

    return (
        <section style={classes.SectionClass}
            onMouseDown={(event) => props.selectSection(props.id, event)}>
            
            <div id={props.id + '_space'} >
                <div id={props.id + '_height'} >
                    {props.mapOuter ? map : null}
                    <div id={props.id + '_width'} >
                        {!props.mapOuter ? map : null}
                        <div style={{
                                ...classes.SectionInnerContent, 
                                outline: !props.previewIsOn ? '1px dashed aqua' : null
                            }}
                            id={props.id}
                            name="keyElement" >
                            {props.children.map(box => (
                                <Box 
                                    key={box} 
                                    id={box}
                                    handleChooseTextEditor={props.handleChooseTextEditor} />
                            ))}
                        </div>
                        <ControlSectionDrag id={props.id} />
                    </div>
                    <ControlSectionHeight id={props.id} />
                </div>
            </div>
            <ControlSectionSpace id={props.id}/>
            <Global styles={styles} />
        </section>
    );

};

Section.propTypes = {
    section: PropTypes.shape({
        type: PropTypes.oneOf(['section']).isRequired,
        children: PropTypes.arrayOf(PropTypes.string).isRequired
    }),
    children: PropTypes.arrayOf(PropTypes.string).isRequired,
    hoveredElement: PropTypes.string,
    activeElement: PropTypes.string,
    styles: PropTypes.arrayOf(PropTypes.shape({
        type: PropTypes.oneOf(['hover', 'active']).isRequired,
        influencer: PropTypes.string.isRequired
    })).isRequired
};

const mapStateToProps = (state, props) => {
    return {
        section: state.builder.present[props.id],
        children: state.builder.present[props.id].children,
        hoveredElement: state.builder.present.hoveredElement,
        activeElement: state.builder.present.activeElement,
        styles: state.builder.present[props.id].styles.map( style => state.builder.present[style] ),
        previewIsOn: state.builder.present.preview        
    };
};

const mapDispatchToProps = dispatch => {
    return {
        selectSection: (item, event) => {dispatch(actions.chooseSection(item, event))}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Section);

