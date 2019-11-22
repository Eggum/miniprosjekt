// @flow

import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Card } from '../src/widgets/card';

describe('Card test', () => {
    const wrapper: ShallowWrapper = shallow(
        <Card title="Artikkel" image="url" alt="bilde alt" id="2" />
    );
    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
