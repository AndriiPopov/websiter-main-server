import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { Layout } from './Layout';

configure({adapter: new Adapter()});

describe('Layout', () => {
    it('should be defined', () => {
        expect(Layout).toBeDefined();
    });

    it('it should render children inside', () => {
        const tree = shallow(
            <Layout>
                <div><p>Test</p></div>
            </Layout>
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});