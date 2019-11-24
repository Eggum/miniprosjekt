// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../widgets/alert';
import { Article, articleService } from '../services';
import { Card } from '../widgets/card';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { LoadingSpinner } from '../widgets/loadingSpinner';

/**
 * This page displays the articles the user has created.
 * If user has not created an article a link to new article is displayed.
 */

// The property types of sign up component.
type prop = {
    stateID: number
};

// The states that are going to be mapped to the component as properties.
function mapStateToProps(state) {
    return { stateID: state.id };
}

export class myArticlesComp extends Component<prop> {
    articles: Article[] = [];
    waitingForServerResponse: boolean = false;

    mounted() {
        this.waitingForServerResponse = true;
        articleService
            .getArticles()
            .then(articles => {
                this.waitingForServerResponse = false;
                this.articles = articles.filter(
                    a => a.creator === this.props.stateID && a.creator !== 1
                );
            })
            .catch((error: Error) => {
                this.waitingForServerResponse = false;
                Alert.danger(error.message);
            });
    }

    render() {
        if (this.waitingForServerResponse === true) {
            return <LoadingSpinner />;
        } else if (this.articles.length === 0) {
            return (
                <div className="textAlignCenter">
                    <h2>You have created no articles.</h2>
                    <NavLink className="nav-link" to="/article/new">
                        Click here to create your first article
                    </NavLink>
                </div>
            );
        } else {
            return (
                <div className="card-column-wrapper">
                    <div className="card-columns">
                        {this.articles.map(s => (
                            <Card
                                key={s.id}
                                title={s.title}
                                description={s.text}
                                image={s.image}
                                id={s.id}
                                alt={s.alt}
                            />
                        ))}
                    </div>
                </div>
            );
        }
    }
}

/*
Connects the state to the component.
The original component is not changed. Instead, connect function returns a new, connected component class that wraps the component passed in.
 */
export const MyArticles = connect(mapStateToProps)(myArticlesComp);
