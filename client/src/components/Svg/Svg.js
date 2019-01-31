import React from 'react';
import PropTypes from 'prop-types';

import { svgStringToObj } from '../../utils/svgToObj';

export const Svg = props => {

    const svgChildrensToElements = (element, elementIndex) => {
        switch (element.type) {
            case 'path':;
                return <path
                        key={elementIndex} 
                        d={element.d}
                        fill={element.fill}>
                        {element.children.map( (el, index) => 
                            svgChildrensToElements(el, index)
                        )}
                    </path>;
            case 'g':
                return <g
                        key={elementIndex}
                        fill={element.fill}>
                        {element.children.map( (el, index) => 
                            svgChildrensToElements(el, index)
                        )}
                    </g>;
            default:
                return;

        }
    }

    let result = null;
    if (props.icon) {
        const objectSvg = svgStringToObj(props.icon);

        result = <svg 
                height={objectSvg.height}
                width={objectSvg.width}
                viewBox={objectSvg.viewBox}
                className={props.className}>
                {objectSvg.children.map( (element, index) => 
                    svgChildrensToElements(element, index)
                )}
            </svg>;
    }
    return result;
};

Svg.propTypes = {
    className: PropTypes.string,
    icon: PropTypes.string.isRequired
};

export default Svg;