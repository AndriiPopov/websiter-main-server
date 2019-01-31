import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Global }from '@emotion/core'

import Section from './Section/Section';
import * as classes from './SiteBuilder.css.js';
import * as actions from '../../store/actions/index';
import GoogleFontLoader from 'react-google-font-loader';
import { fontsList, subsets } from './fontsList';
import Frame, { FrameContextConsumer } from 'react-frame-component';
import { ScopeProvider } from './scope-provider';
import { FrameProvider } from './frame-provider';
import SiteBuilderLayout from '../../components/SiteBuilderLayout/SiteBuilderLayout';

class SiteBuilder extends Component {
    state = {
        chosenTextEditor: null
    };
    
    handleChooseTextEditor = editor => {
        this.setState({
            chosenTextEditor: editor
        })
    };

    render () {
        const {props} = this;
        const zoom = props.zoom / 100;
        const size = 100 / zoom + '%';
        return (
            <ScopeProvider scope={"#root .App"}>
                <SiteBuilderLayout textEditor={this.state.chosenTextEditor} >
                <GoogleFontLoader
                    fonts={fontsList}
                    subsets={subsets}
                    document={document} />
                
                <Frame id="builderFrame" style={{
                    width: size,
                    height: size,
                    msZoom: zoom,
                    MozTransform: `scale(${zoom})`,
                    MozTransformOrigin: '0 0',
                    OTransform: `scale(${zoom})`,
                    OTransformOrigin: '0 0',
                    WebkitTransform: `scale(${zoom})`,
                    WebkitTransformOrigin: '0 0',
                    border: 'none',
                    margin: '0',
                    padding: '0',
                }}>
                    <FrameContextConsumer>
                    {
                        ({document, window}) => {
                        return (
                            <FrameProvider>
                            <Global styles={{ 
                                html: { height: '100%'}, 
                                body: { margin: 0, height: '100%' },
                                '.frame-root': { height: '100%'},
                                '.frame-content': { height: '100%'}
                            }} />
                            <GoogleFontLoader
                                fonts={fontsList}
                                subsets={subsets}
                                document={document} />
                            <div style={classes.PageInnerContent}
                                onMouseDown={() => props.deselectElements()}>
                                {props.sections.map(section => 
                                    <Section 
                                        key={section} 
                                        id={section}
                                        handleChooseTextEditor={this.handleChooseTextEditor} />
                                )}
                            </div>
                            </FrameProvider>
                        );
                        }
                    }
                    </FrameContextConsumer>
                </Frame>
                </SiteBuilderLayout>
            </ScopeProvider>
        );
    }
};

SiteBuilder.propTypes = {
  zoom: PropTypes.number.isRequired,
  sections: PropTypes.arrayOf(PropTypes.string)
};

const mapStateToProps = state => {
    return {
        zoom: state.builder.present.pageZoom,
        sections: state.builder.present.sectionsOnPage
    };
};

const mapDispatchToProps = dispatch => {
    return {
        deselectElements: () => {dispatch(actions.deselectElements())}
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SiteBuilder);