import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { NavigationItemButton } from './NavigationItemButton';

configure({adapter: new Adapter()});

describe('NavigationItemButton', () => {
    it('should be defined', () => {
        expect(NavigationItemButton).toBeDefined();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = shallow(
            <NavigationItemButton
                disabled
                clicked="clicked"
                icon="<svg></svg>" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = shallow(
            <NavigationItemButton
                clicked="clicked"
                icon="<svg></svg>" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});