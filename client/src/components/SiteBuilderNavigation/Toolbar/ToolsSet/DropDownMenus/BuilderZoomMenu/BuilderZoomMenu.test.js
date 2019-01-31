import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { BuilderZoomMenu } from './BuilderZoomMenu';

configure({adapter: new Adapter()});

describe('BuilderZoomMenu', () => {
    it('should be defined', () => {
        expect(BuilderZoomMenu).toBeDefined();
    });

    it('it should render a dropdown align menu', () => {
        const tree = shallow(
            <BuilderZoomMenu
                alignMode="parent" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});