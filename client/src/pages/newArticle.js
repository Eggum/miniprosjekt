// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../widgets/alert.js';
import { Article, articleService } from '../services.js';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import { ConfirmBox } from '../widgets/confirmBox';
import { connect } from 'react-redux';
import { LoginPopUp } from '../widgets/loginAgainBox';
import type { ErrorResponse } from '../types';
import { Form } from '../widgets/form';
declare var jQuery: any;

const history: HashHistory = createHashHistory();

/**
 * Page where the user can create an article.
 * If user is not logged in a pop up will be shown prompting the user to log in.
 */

// The states that are going to be mapped to the component as properties.
function mapStateToProps(state) {
    return {
        isLogged: state.isLogged,
        stateID: state.id
    };
}

class NewArticleComp extends Component<{ stateID: number, isLogged: boolean }> {
    article: Article = new Article();

    mounted() {
        if (!this.props.isLogged) {
            jQuery('#loginPopUp').modal({
                backdrop: 'static',
                keyboard: false
            });

            jQuery('#loginPopUp').modal('show');
        }
    }

    render() {
        return (
            <div>
                <ConfirmBox
                    modalId="cancelNewArticleConfirmBox"
                    modalHeader="Cancel create article"
                    modalBody="Are you sure you want to cancel new article?"
                    onClick={this.cancel}
                />
                <LoginPopUp ifCancel={this.cancel} />
                <h1 className="textAlignCenter">New article</h1>
                <Form
                    article={this.article}
                    dataTarget="cancelNewArticleConfirmBox"
                    onSubmit={this.save}
                />
            </div>
        );
    }

    save(event: SyntheticInputEvent<HTMLFormElement>) {
        event.preventDefault();

        // if the user has not set the importance to be 1, the article importance is undefined and has to be changed to 2.
        if (this.article.importance !== 1) {
            this.article.importance = 2;
        }
        this.article.creator = this.props.stateID;

        articleService
            .postArticle(this.article)
            .then(articleID => {
                history.push('/article/' + +articleID);
            })
            .catch((error: ErrorResponse) => {
                if (error.response.status === 401) {
                    jQuery('#loginPopUp').modal({
                        backdrop: 'static',
                        keyboard: false
                    });

                    jQuery('#loginPopUp').modal('show');
                } else {
                    window.scrollTo(0, 0);
                    Alert.danger(error.message);
                }
            });
    }
    cancel() {
        history.goBack();
    }
}

/*
Connects the state to the component.
The original component is not changed. Instead, connect function returns a new, connected component class that wraps the component passed in.
 */
export const NewArticle = connect(mapStateToProps)(NewArticleComp);
