import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { toolsSection as ToolsSection } from './ToolsSection';

configure({adapter: new Adapter()});

describe('ToolsSection', () => {
    it('should be defined', () => {
        expect(ToolsSection).toBeDefined();
    });

    it('it should render a td with children and title', () => {
        const tree = shallow(
            <ToolsSection
                label="Test section" >
                <p>Test</p>
            </ToolsSection>
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});