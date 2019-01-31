import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { BoxBorderMenu } from './BoxBorderMenu';

configure({adapter: new Adapter()});

describe('BoxBorderMenu', () => {
    it('should be defined', () => {
        expect(BoxBorderMenu).toBeDefined();
    });

    it('it should render a dropdown align menu', () => {
        const tree = shallow(
            <BoxBorderMenu
                alignMode="parent" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});