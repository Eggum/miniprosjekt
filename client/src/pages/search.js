// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../widgets/alert';
import { Article, articleService } from '../services';
import { Card } from '../widgets/card';
import { LoadingSpinner } from '../widgets/loadingSpinner';

/**
 * The page displaying the results of a search. Articles with a title containing the search input are displayed.
 */

export class Search extends Component<{
    match: { params: { search: string } }
}> {
    input: string = this.props.match.params.search;
    articles: Article[] = [];
    waitingForServerResponse: boolean = false;

    mounted() {
        this.input = this.props.match.params.search;
        this.waitingForServerResponse = true;
        articleService
            .getArticles()
            .then(articles => {
                this.waitingForServerResponse = false;
                this.articles = articles.filter(a =>
                    a.title.toUpperCase().includes(this.input.toUpperCase())
                );
            })
            .catch((error: Error) => {
                Alert.danger(error.message);
                this.waitingForServerResponse = false;
            });
    }

    render() {
        if (this.waitingForServerResponse === true) {
            return <LoadingSpinner />;
        } else if (this.articles.length === 0) {
            return (
                <div className="padding">
                    <h1>Search result: </h1>
                    <strong>
                        Your search input "{this.input}" yielded no results.
                    </strong>
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
