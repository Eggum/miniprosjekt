// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card } from '../src/widgets/widgets.js';
import { shallow, mount, ShallowWrapper } from 'enzyme/build';
import {ConfirmBox} from "../src/widgets/widgets";
import {Button} from "../src/widgets/buttons.js";


it('generisk', () =>{
    expect(1).toEqual(1);
});

/*
describe('Button tests', () => {
    const mockCallBack = jest.fn();
    const wrapper = shallow(<Button.Primary onClick={test}/>);

    it('button test', () => {
        expect(typeof wrapper).toEqual('object');
        expect(wrapper).toHaveLength(1);

        wrapper.simulate('click');
        wrapper.find('button').simulate('click');
        //     wrapper.find('button').simulate('click');
        expect(mockCallBack.mock.calls.length).toEqual(1);
    });
});
*/