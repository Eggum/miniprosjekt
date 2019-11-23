// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../widgets/alert';
import { Article, articleService } from '../services';
import { Card } from '../widgets/card';

/**
 * The page where the user is view articles that belongs to a specific category.
 */

export class ArticleByCategory extends Component<{
    match: { params: { category: string } }
}> {
    input: string = this.props.match.params.category;
    articles: Article[] = [];

    mounted() {
        this.input = this.props.match.params.category;

        articleService
            .getArticles()
            .then(
                articles =>
                    (this.articles = articles.filter(a =>
                        a.category
                            .toUpperCase()
                            .includes(this.input.toUpperCase())
                    ))
            )
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
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
