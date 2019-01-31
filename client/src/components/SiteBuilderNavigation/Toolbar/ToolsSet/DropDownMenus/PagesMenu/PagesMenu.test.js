import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { PagesMenu } from './PagesMenu';

configure({adapter: new Adapter()});

describe('PagesMenu', () => {
    it('should be defined', () => {
        expect(PagesMenu).toBeDefined();
    });

    it('it should render a dropdown align menu', () => {
        const tree = shallow(
        <PagesMenu
                alignMode="parent" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});