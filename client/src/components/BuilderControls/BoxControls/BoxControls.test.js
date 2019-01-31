import React from 'react';
import renderer from 'react-test-renderer';

import { BoxControls } from './BoxControls';

describe('BoxControls', () => {
    it('should be defined', () => {
        expect(BoxControls).toBeDefined();
    });

    it('it should have 4 side draw divs and 1 drag div when this box is chosen and not entered', () => {
        const tree = renderer.create(
            <BoxControls  id="element_879"
                chosenBoxes={['element_879', 'element_89']}
                enteredBoxes={[]} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('it should be null when this box is not chosen and not entered', () => {
        const tree = renderer.create(
            <BoxControls  id="element_879"
                chosenBoxes={['element_56']}
                enteredBoxes={['element_879']} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('it should have drag div when this box is not chosen and not entered', () => {
        const tree = renderer.create(
            <BoxControls  id="element_879"
                chosenBoxes={['element_56']}
                enteredBoxes={['element_8759']} />
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});