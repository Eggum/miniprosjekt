// @flow

import * as React from 'react';
import { Alert } from '../src/widgets/alert.js';
import { shallow, mount, ShallowWrapper } from 'enzyme';

/**
 * Alert test from lecturer.
 */

describe('Alert tests', () => {
    const wrapper: ShallowWrapper = shallow(<Alert />);

    it('initially', () => {
        let instance = Alert.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.alerts).toEqual([]);

        expect(wrapper.find('button.close')).toHaveLength(0);
    });

    it('after danger', done => {
        Alert.danger('test');

        // Wait for the Alert component to finish drawing
        setTimeout(() => {
            let instance = Alert.instance();
            expect(typeof instance).toEqual('object');
            if (instance)
                expect(instance.alerts).toEqual([
                    { id: 0, text: 'test', type: 'danger' }
                ]);

            expect(wrapper.find('button.close')).toHaveLength(1);

            done();
        });
    });

    it('after clicking close button', () => {
        wrapper.find('button.close').simulate('click');

        let instance = Alert.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.alerts).toEqual([]);

        expect(wrapper.find('button.close')).toHaveLength(0);
    });
});
