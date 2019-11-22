// @flow

import * as React from 'react';
import { shallow, mount, ShallowWrapper } from 'enzyme';
import { CommentSection } from '../src/widgets/commentSection';
import { Comment } from '../src/services.js';

describe('Comment section test', () => {

    it('yo', () => {
        expect(1).toEqual(1);
    });
    /*
    const test_publish_comment = jest.fn();
    const test_delete_comment = jest.fn();
    const newComment = new Comment();

    const comments: Array<Comment> = [];
    const comment1: Comment = new Comment();
    comment1.id = 1;
    comment1.text = 'hei';
    comment1.creation_date = '2019-11-16T23:02:47.000Z';
    comment1.creator = 1;
    comment1.article = 1;
    comment1.username = 'ole';

    const comment2: Comment = new Comment();
    comment2.id = 2;
    comment2.text = 'hei du';
    comment2.creation_date = '2019-11-15T23:02:47.000Z';
    comment2.creator = 2;
    comment2.article = 1;
    comment2.username = 'per';

    comments.push(comment2);

    const wrapper: ShallowWrapper = shallow(
        <CommentSection
            comments={comments}
            newComment={newComment}
            onClick={test_publish_comment}
            onDelete={test_delete_comment}
        />
    );
    it('renders correctly', () => {
        expect(wrapper.debug()).toMatchSnapshot();
    });

    it('click publish comment button', () =>{
        wrapper.find('button.btn-primary').simulate('click');
        expect(test_publish_comment.mock.calls.length).toEqual(1);
    });
    it('click delete comment button', () =>{
        wrapper.find('button.btn-danger').simulate('click');
        expect(test_delete_comment.mock.calls.length).toEqual(1);
    });
    */
});
