import React from 'react';
import {mount, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { RangeInput } from './RangeInput';

configure({adapter: new Adapter()});

describe('RangeInput', () => {
    it('should be defined', () => {
        expect(RangeInput).toBeDefined();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = mount(
            <RangeInput 
                step="1"
                min="0"
                max="100"
                sectionValues="{}"
                boxesValues="{}"
                changedStyleValues="[]" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});