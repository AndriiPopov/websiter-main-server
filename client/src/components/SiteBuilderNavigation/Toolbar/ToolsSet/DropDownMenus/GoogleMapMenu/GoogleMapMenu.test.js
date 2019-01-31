import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { GoogleMapMenu } from './GoogleMapMenu';

configure({adapter: new Adapter()});

describe('GoogleMapMenu', () => {
    it('should be defined', () => {
        expect(GoogleMapMenu).toBeDefined();
    });

    it('it should render a dropdown map menu', () => {
        const tree = shallow(
            <GoogleMapMenu
                 />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});