import React from 'react';
import {shallow, configure} from 'enzyme';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';

import { SmallButtonDropDown } from './SmallButtonDropDown';

configure({adapter: new Adapter()});

describe('SmallButtonDropDown', () => {
    it('should be defined', () => {
        expect(SmallButtonDropDown).toBeDefined();
    });

    it('it should render with dropdown closed', () => {
        const tree = shallow(
            <SmallButtonDropDown 
                icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>' 
                title="Button"
                dropDownType="boxAlign" />
        );
        expect(toJson(tree)).toMatchSnapshot();
    });

    it('it should render with dropdown open', () => {
        const tree = shallow(
            <SmallButtonDropDown 
                icon='<svg height="16" viewBox="0 0 24 24" width="16"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z"></path></svg>' 
                title="Button"
                dropDownType="boxAlign" />
        );
        tree.find('button').first().simulate('click');
        expect(toJson(tree)).toMatchSnapshot();
    });
});