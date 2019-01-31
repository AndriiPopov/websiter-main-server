import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { NavigationItemButtonDropDown } from './NavigationItemButtonDropDown';

configure({adapter: new Adapter()});

describe('NavigationItemButtonDropDown', () => {
    it('should be defined', () => {
        expect(NavigationItemButtonDropDown).toBeDefined();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = shallow(
            <NavigationItemButtonDropDown
                disabled
                clicked="clicked"
                icon="<svg></svg>" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('it should render button with onclick', () => {
        const tree = shallow(
            <NavigationItemButtonDropDown
                clicked="clicked"
                icon="<svg></svg>" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('it should render a dropdown div with cover', () => {
        const tree = shallow(
            <NavigationItemButtonDropDown
                clicked="clicked"
                icon="<svg></svg>" />
        );
        tree.find('li').first().simulate('click');
        expect(toJson(tree)).toMatchSnapshot();
    });
});