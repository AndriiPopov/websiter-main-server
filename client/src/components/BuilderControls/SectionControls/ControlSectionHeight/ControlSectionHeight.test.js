import React from 'react';
import renderer from 'react-test-renderer';

import { ControlSectionHeight } from './ControlSectionHeight';

describe('BoxControls', () => {
    it('should be defined', () => {
        expect(ControlSectionHeight).toBeDefined();
    });

    it('it should render 1 div', () => {
        const tree = renderer.create(
            <ControlSectionHeight />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});