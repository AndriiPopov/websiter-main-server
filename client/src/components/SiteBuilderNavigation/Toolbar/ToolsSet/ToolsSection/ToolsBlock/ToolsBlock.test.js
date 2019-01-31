import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { toolsBlock as ToolsBlock } from './ToolsBlock';

configure({adapter: new Adapter()});

describe('ToolsBlock', () => {
    it('should be defined', () => {
        expect(ToolsBlock).toBeDefined();
    });

    it('it should render a td with children', () => {
        const tree = shallow(
            <ToolsBlock>
                <p>Test</p>
            </ToolsBlock>
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});