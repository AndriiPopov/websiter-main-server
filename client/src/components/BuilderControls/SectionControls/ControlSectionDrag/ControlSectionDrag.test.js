import React from 'react';
import renderer from 'react-test-renderer';

import { ControlSectionDrag } from './ControlSectionDrag';

describe('BoxControls', () => {
    it('should be defined', () => {
        expect(ControlSectionDrag).toBeDefined();
    });

    it('it should have green background when this section is chosen', () => {
        const tree = renderer.create(
            <ControlSectionDrag  id="element_879"
                chosenSection="element_879" />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('it should not have green background when this section is not chosen', () => {
        const tree = renderer.create(
            <ControlSectionDrag  id="element_879"
                chosenSection="element_8579" />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});