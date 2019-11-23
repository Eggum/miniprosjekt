// @flow

import * as React from 'react';
import { ConfirmBox } from '../src/widgets/confirmBox.js';
import { shallow, mount, ShallowWrapper } from 'enzyme';

/**
 * Confirm box tests.
 */

describe('Confirm box tests', () => {
    const test = jest.fn();

    const wrapper: ShallowWrapper = shallow(
        <ConfirmBox
            modalId={1}
            modalHeader={'test'}
            modalBody={'test'}
            onClick={test}
        />
    );

    it('initially', () => {
        expect(typeof wrapper).toEqual('object');
        expect(wrapper.find('button.btn-secondary')).toHaveLength(1);
        expect(wrapper.find('button.close')).toHaveLength(1);
        expect(wrapper.find('button.btn-primary')).toHaveLength(1);
    });

    it('after clicking yes button', () => {
        wrapper.find('button.btn-primary').simulate('click');

        let instance = ConfirmBox.instance();
        expect(typeof instance).toEqual('object');

        expect(test.mock.calls.length).toEqual(1);
    });

    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
