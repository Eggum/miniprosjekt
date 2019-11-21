// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert, Card } from '../src/widgets/widgets.js';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import {ConfirmBox} from "../src/widgets/widgets";
import {Button} from "../src/widgets/buttons.js";

describe('Button tests', () => {
    const test = jest.fn();
    const wrapper = shallow(<Button.Primary onClick={test}/>);

    it('button test', () => {
        expect(typeof wrapper).toEqual('object');
        expect(wrapper).toHaveLength(1);

        wrapper.find('button.btn').simulate('click');
        expect(test.mock.calls.length).toEqual(1);
    });
});
