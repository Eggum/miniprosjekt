// @flow

import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Card } from '../src/widgets/card';

/**
 * Card test
 */

describe('Card test', () => {
    const wrapper: ShallowWrapper = shallow(
        <Card title="Artikkel" image="url" alt="bilde alt" id="2" />
    );

    it('instance', () => {
        let instance = Card.instance();
        expect(typeof instance).toEqual('object');
    });

    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
