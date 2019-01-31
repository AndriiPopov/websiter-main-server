import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { MagneticDragHighlight } from './MagneticDragHighlight';

configure({adapter: new Adapter()});

describe('MagneticDragHighlight', () => {
    it('should be defined', () => {
        expect(MagneticDragHighlight).toBeDefined();
    });

    it('it should render 2 divs', () => {
        const tree = shallow(
            <MagneticDragHighlight 
                line={{
                    height: 100,
                    width: 200,
                    left: 300,
                    top: 500
                }}
                element={{
                    height: 101,
                    width: 201,
                    left: 301,
                    top: 501
                }} />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});