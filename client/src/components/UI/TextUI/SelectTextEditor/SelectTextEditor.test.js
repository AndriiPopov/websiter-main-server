import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { BigColorPicker } from './BigColorPicker';

configure({adapter: new Adapter()});

describe('BigColorPicker', () => {
    it('should be defined', () => {
        expect(BigColorPicker).toBeDefined();
    });

    it('it should render a button with radio', () => {
        const tree = shallow(
            <BigColorPicker isSection
                title="Background"
                color="rgba(30, 250, 100, 1)"
                sectionValues="[]"
                boxesValues="{}"
                changedStyleValues="{}"
                changed="changeElementPropertyValue" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });

});