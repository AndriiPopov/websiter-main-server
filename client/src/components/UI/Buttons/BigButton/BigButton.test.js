import React from 'react';
import {mount, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { BigButton } from './BigButton';

configure({adapter: new Adapter()});

describe('BigButton', () => {
    it('should be defined', () => {
        expect(BigButton).toBeDefined();
    });

    it('it should render button with onclick null when disabled', () => {
        const tree = mount(
            <BigButton 
                icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>' 
                title="Button"
                buttonClicked="clickOnButton" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });
});