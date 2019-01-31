import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { NavigationItems } from './NavigationItems';

configure({adapter: new Adapter()});

describe('NavigationItems', () => {
    it('should be defined', () => {
        expect(NavigationItems).toBeDefined();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = shallow(
            <NavigationItems />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});