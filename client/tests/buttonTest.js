// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert} from '../src/widgets/Alert.js';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { ConfirmBox } from '../src/widgets/confirmBox';
import { Button } from '../src/widgets/buttons.js';
import {Card} from "../src/widgets/card";

describe('Button tests', () => {
    const test = jest.fn();
    const wrapper = shallow(<Button.Primary onClick={test} />);

    it('button test', () => {
        expect(typeof wrapper).toEqual('object');
        expect(wrapper).toHaveLength(1);

        wrapper.find('button.btn').simulate('click');
        expect(test.mock.calls.length).toEqual(1);
    });
});
