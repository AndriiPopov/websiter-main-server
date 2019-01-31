import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { PageSettingsMenu } from './PageSettingsMenu';

configure({adapter: new Adapter()});

describe('BoxBorderMenu', () => {
    it('should be defined', () => {
        expect(PageSettingsMenu).toBeDefined();
    });

    it('it should render a dropdown align menu', () => {
        const tree = shallow(
            <PageSettingsMenu
                alignMode="parent" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});