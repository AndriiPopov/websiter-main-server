import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { BigButtonWithCheckbox } from './BigButtonWithCheckbox';

configure({adapter: new Adapter()});

describe('BigButtonWithCheckbox', () => {
    it('should be defined', () => {
        expect(BigButtonWithCheckbox).toBeDefined();
    });

    it('it should render a button with radio', () => {
        const tree = shallow(
            <BigButtonWithCheckbox 
                title="Button" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });

});