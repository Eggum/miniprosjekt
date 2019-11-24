// @flow

import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Button } from '../src/widgets/buttons.js';

/**
 * Button tests.
 */

describe('Button tests', () => {
    const test = jest.fn();
    const wrapper: ShallowWrapper = shallow(<Button.Primary onClick={test} />);

    it('instance', () => {
        let instance = Button.Primary.instance();
        expect(typeof instance).toEqual('object');
    });

    it('button click test', () => {
        expect(typeof wrapper).toEqual('object');
        expect(wrapper).toHaveLength(1);

        wrapper.find('button.btn').simulate('click');
        expect(test.mock.calls.length).toEqual(1);
    });

    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
