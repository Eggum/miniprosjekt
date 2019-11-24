// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../widgets/alert.js';
import { Category, Article, articleService } from '../services.js';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import { ConfirmBox } from '../widgets/confirmBox';
import { LoginPopUp } from '../widgets/loginAgainBox';
import type { ErrorResponse } from '../types';
import { Form } from '../widgets/form';
declare var jQuery: any;

const history: HashHistory = createHashHistory();

/**
 * The page where the user edits an existing article.
 */

export class EditArticle extends Component<{
    match: { params: { id: number } }
}> {
    article: Article = new Article();
    error: boolean = false;
    categories: Category[] = [];

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
                    this.article.category = article.category;
                    this.article.creator = article.creator;
                    this.article.importance = article.importance;
                    this.article.paragraphs = this.article.text.split(
                        /[\r\n]+/
                    );
                } else {
                    this.error = true;
                }
            })
            .catch((error: Error) => Alert.danger(error.message));

        articleService
            .getCategories()
            .then(categories => {
                this.categories = categories;
            })
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
                <ConfirmBox
                    modalId="cancelEditConfirmBox"
                    modalHeader="Cancel edit"
                    modalBody="Are you sure you want to cancel edit?"
                    onClick={this.cancel}
                />
                <LoginPopUp />
                <h1 className="textAlignCenter">Edit article</h1>
                <Form
                    article={this.article}
                    dataTarget="cancelEditConfirmBox"
                    onSubmit={this.save}
                />
            </div>
        );
    }

    cancel() {
        history.goBack();
    }

    save(event: SyntheticInputEvent<HTMLFormElement>) {
        event.preventDefault();

        articleService
            .updateArticle(this.article)
            .then(() => {
                history.push('/article/' + this.article.id);
                Alert.success('Article updated');
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
