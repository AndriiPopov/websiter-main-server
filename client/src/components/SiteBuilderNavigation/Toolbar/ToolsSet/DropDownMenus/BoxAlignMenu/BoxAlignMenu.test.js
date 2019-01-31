import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { BoxAlignMenu } from './BoxAlignMenu';

configure({adapter: new Adapter()});

describe('BoxAlignMenu', () => {
    it('should be defined', () => {
        expect(BoxAlignMenu).toBeDefined();
    });

    it('it should render a dropdown align menu', () => {
        const tree = shallow(
            <BoxAlignMenu
                alignMode="parent" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});