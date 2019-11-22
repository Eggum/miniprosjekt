// @flow

import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Button } from '../src/widgets/buttons.js';

describe('Button tests', () => {
    const test = jest.fn();
    const wrapper = shallow(<Button.Primary onClick={test} />);

    it('button test', () => {
        expect(typeof wrapper).toEqual('object');
        expect(wrapper).toHaveLength(1);

        wrapper.find('button.btn').simulate('click');
        expect(test.mock.calls.length).toEqual(1);
    });

    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
