// @flow

import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { Form } from '../src/widgets/form';
import { Article } from '../src/services.js';

/**
 * Form tests.
 */

describe('Form test', () => {
    const test = jest.fn();

    let article: Article = new Article();
    article.id = 6;
    article.title = 'Tittel';
    article.text = 'Heisann på deisann';
    article.creation_date = '2019-11-15T23:02:47.000Z';
    article.image = 'url';
    article.alt = 'alt string';
    article.category = 'kultur';
    article.importance = 1;
    article.image_text = 'bildetekst';
    article.creator = 10;
    article.username = 'Petter';

    const wrapper: ShallowWrapper = shallow(
        <Form article={article} dataTarget="dataTarget" onSubmit={test} />
    );

    it('instance', () => {
        let instance = Form.instance();
        expect(typeof instance).toEqual('object');
        if (instance) expect(instance.categories).toEqual([]);
    });

    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('submit form test', () => {
        // when the form is submitted the onSubmit functions are called.
        wrapper.find('form').simulate('submit');
        expect(test.mock.calls.length).toEqual(1);
    });
});
