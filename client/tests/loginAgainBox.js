// @flow

import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { LoginPopUp } from '../src/widgets/loginAgainBox';

/**
 * Login again box tests.
 */

describe('Login again box tests', () => {
    const wrapper: ShallowWrapper = shallow(<LoginPopUp />);

    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });
});
