import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { NavigationItem } from './NavigationItem';

configure({adapter: new Adapter()});

describe('NavigationItem', () => {
    it('should be defined', () => {
        expect(NavigationItem).toBeDefined();
    });

    it('it should render children inside', () => {
        const tree = shallow(
            <NavigationItem
                activeItem="box"
                type="section" >
                <div><p>Test</p></div>
            </NavigationItem>
        );
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('it should render children inside and have active class', () => {
        const tree = shallow(
            <NavigationItem
                activeItem="section"
                type="section" >
                <div><p>Test</p></div>
            </NavigationItem>
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});