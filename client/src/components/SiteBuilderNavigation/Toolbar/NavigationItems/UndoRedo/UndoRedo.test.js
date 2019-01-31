import React from 'react';
import {mount, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { UndoRedo } from './UndoRedo';

configure({adapter: new Adapter()});

describe('UndoRedo', () => {
    it('should be defined', () => {
        expect(UndoRedo).toBeDefined();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = mount(
            <UndoRedo
                disabled
                clicked="clicked"
                icon="<svg></svg>" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});