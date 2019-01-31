import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { ToolsSet } from './ToolsSet';

configure({adapter: new Adapter()});

describe('ToolSet', () => {
    it('should be defined', () => {
        expect(ToolsSet).toBeDefined();
    });

    it('it should render a table', () => {
        const tree = shallow(
            <ToolsSet activeTopMenuItem="boxes" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});