import React from 'react';
import {mount, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { ValueInput } from './ValueInput';

configure({adapter: new Adapter()});

describe('ValueInput', () => {
    it('should be defined', () => {
        expect(ValueInput).toBeDefined();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = mount(
            <ValueInput
                sectionValues="{}"
                boxesValues="{}"
                changedStyleValues="[]" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});