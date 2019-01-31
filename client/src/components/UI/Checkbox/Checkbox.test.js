import React from 'react';
import {mount, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { Checkbox } from './Checkbox';

configure({adapter: new Adapter()});

describe('Checkbox', () => {
    it('should be defined', () => {
        expect(Checkbox).toBeDefined();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = mount(
            <Checkbox 
                checked
                sectionValues="{}"
                boxesValues="{}"
                changedStyleValues="[]" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});