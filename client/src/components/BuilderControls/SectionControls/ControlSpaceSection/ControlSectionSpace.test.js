import React from 'react';
import renderer from 'react-test-renderer';

import { ControlSectionSpace } from './ControlSectionSpace';

describe('BoxControls', () => {
    it('should be defined', () => {
        expect(ControlSectionSpace).toBeDefined();
    });

    it('it should render 1 div', () => {
        const tree = renderer.create(
            <ControlSectionSpace />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});