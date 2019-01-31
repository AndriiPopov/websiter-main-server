import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { toolbar as Toolbar } from './Toolbar';

configure({adapter: new Adapter()});

describe('Toolbar', () => {
    it('should be defined', () => {
        expect(Toolbar).toBeDefined();
    });

    it('it should render a toolbar', () => {
        const tree = shallow(
            <Toolbar />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});