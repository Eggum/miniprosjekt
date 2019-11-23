// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../widgets/alert.js';
import { Button } from '../widgets/buttons.js';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import {
    Article,
    articleService,
    Comment,
    commentService
} from '../services.js';
import { NavLink } from 'react-router-dom';
import { CommentSection } from '../widgets/commentSection.js';
import { LoadingSpinner } from '../widgets/loadingSpinner.js';
import { connect } from 'react-redux';
import { LoginPopUp } from '../widgets/loginAgainBox.js';
import type { ErrorResponse } from '../types';
import { ConfirmBox } from '../widgets/confirmBox';
declare var jQuery: any;
const history: HashHistory = createHashHistory();

/**
 * Page where the user views an article. User state are stored with Redux-library.
 * If the user is logged in and is viewing their own article, the user can edit and delete the article.
 * If the user is logged in and has commented on the article, the user can delete their own comments.
 * If the user is logged in the user comments with their username.
 * If the user is not logged in the user comments with the username "Anonym".
 */

// The states that are going to be mapped to the component as properties.
function mapStateToProps(state) {
    return {
        isLogged: state.isLogged,
        stateID: state.id
    };
}

class ViewArticleComp extends Component<{
    match: { params: { id: number } },
    isLogged: boolean,
    stateID: number
}> {
    article: Article = new Article();
    error: boolean = false;
    comments: Array<Comment> = [];
    newComment: Comment = new Comment();

    mounted() {
        articleService
            .getArticle(this.props.match.params.id)
            .then(article => {
                if (article != null) {
                    this.article.id = this.props.match.params.id;
                    this.article.title = article.title;
                    this.article.text = article.text;
                    this.article.image = article.image;
                    this.article.alt = article.alt;
                    this.article.image_text = article.image_text;
                    this.article.creation_date = article.creation_date;
                    this.article.creator = article.creator;
                    this.article.category = article.category;
                    this.article.importance = article.importance;
                    this.article.username = article.username;
                    this.article.paragraphs = this.article.text.split(
                        /[\r\n]+/
                    );
                } else {
                    this.error = true;
                }
            })
            .catch((error: Error) => Alert.danger(error.message));

        commentService
            .getComments(this.props.match.params.id)
            .then(comments => (this.comments = comments))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        if (this.error === true || this.article == null) {
            Alert.danger('Article not found: ' + this.props.match.params.id);
            history.push('/');
            return null; // Return empty object (nothing to render)
        } else if (this.article.title === undefined) {
            return <LoadingSpinner />;
        }

        return (
            <div>
                <ConfirmBox
                    modalId="deleteConfirmBox"
                    modalHeader="Delete article"
                    modalBody="Are you sure you want to delete article?"
                    onClick={this.delete}
                />
                <LoginPopUp />
                <article>
                    <img src={this.article.image} alt="Need something here" />
                    <h1>{this.article.title}</h1>
                    <p>
                        {new Date(this.article.creation_date).toLocaleString()}
                    </p>
                    <p>Author: {this.article.username}</p>
                    <NavLink to={'/article/' + this.article.category}>
                        {this.article.category}
                    </NavLink>
                    <hr />
                    {this.article.paragraphs.map((p, index) => (
                        <p key={index}>{p}</p>
                    ))}

                    {this.props.isLogged &&
                    this.props.stateID === this.article.creator ? (
                        <div>
                            <Button.Primary onClick={this.edit}>
                                Edit
                            </Button.Primary>
                            <Button.ModalDanger dataTarget="deleteConfirmBox">
                                Delete article
                            </Button.ModalDanger>
                        </div>
                    ) : null}
                    <CommentSection
                        comments={this.comments}
                        newComment={this.newComment}
                        onClick={this.publish_comment}
                        onDelete={this.delete_comment}
                    />
                </article>
            </div>
        );
    }

    edit() {
        history.push('/article/' + +this.props.match.params.id + '/edit');
    }

    delete_comment(comment: Comment) {
        commentService
            .deleteComment(comment)
            .then(res => {
                console.log(res);
                commentService
                    .getComments(this.props.match.params.id)
                    .then(comments => (this.comments = comments))
                    .catch((error: Error) => {
                        Alert.danger(error.message);
                    });
                Alert.success('Comment successfully deleted');
            })
            .catch((error: ErrorResponse) => {
                if (error.response.status === 401) {
                    jQuery('#loginPopUp').modal({
                        backdrop: 'static',
                        keyboard: false
                    });

                    jQuery('#loginPopUp').modal('show');
                } else {
                    Alert.danger(error.message);
                }
            });
    }

    publish_comment() {
        if (
            this.newComment.text !== '' &&
            this.newComment.text !== undefined &&
            this.newComment.text !== null
        ) {
            this.newComment.creator = this.props.stateID;
            this.newComment.article = this.props.match.params.id;

            commentService.postComment(this.newComment).then(e => {
                console.log(e);
                commentService
                    .getComments(this.props.match.params.id)
                    .then(comments => (this.comments = comments))
                    .catch((error: Error) => {
                        Alert.danger(error.message);
                    });
            });
        }
    }

    delete() {
        articleService
            .deleteArticle(this.props.match.params.id)
            .then(() => {
                Alert.success('Article successfully deleted');
                history.push('/');
            })
            .catch((error: ErrorResponse) => {
                if (error.response.status === 401) {
                    jQuery('#loginPopUp').modal({
                        backdrop: 'static',
                        keyboard: false
                    });

                    jQuery('#loginPopUp').modal('show');
                } else {
                    Alert.danger(error.message);
                }
            });
    }
}

/*
Connects the state to the component.
The original component is not changed. Instead, connect function returns a new, connected component class that wraps the component passed in.
 */
export const ViewArticle = connect(mapStateToProps)(ViewArticleComp);
