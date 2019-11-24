// @flow

import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Carousel } from '../src/widgets/carousel';

/**
 * Carousel tests.
 */

describe('Carousel tests', () => {
    const wrapper: ShallowWrapper = shallow(<Carousel />);

    it('instance', () => {
        let instance = Carousel.instance();
        expect(typeof instance).toEqual('object');
    });

    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
