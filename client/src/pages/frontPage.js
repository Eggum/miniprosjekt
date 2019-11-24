// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../widgets/alert.js';
import { Carousel } from '../widgets/carousel';
import { Article, articleService } from '../services.js';
import { NavLink } from 'react-router-dom';
import { Button } from '../widgets/buttons.js';
import { Card } from '../widgets/card';
import { LoadingSpinner } from '../widgets/loadingSpinner.js';

/**
 * Front page of the website. The articles are ordered by creation date. And only important articles (importance = 1) are displayed in the carousel.
 */

export class Home extends Component {
    articles: Array<Article> = [];
    articlesSliced: Array<Article> = [];
    // low number on sliceFactor for example purpose.
    sliceFactor: number = 5;

    mounted() {
        articleService
            .getArticles()
            .then(articles => {
                this.articles = articles;
                this.articles.sort((a, b) =>
                    a.creation_date < b.creation_date
                        ? 1
                        : b.creation_date < a.creation_date
                        ? -1
                        : 0
                );
                this.articlesSliced = this.articles.slice(0, 5);
            })
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        if (this.articles.length === 0) {
            return <LoadingSpinner />;
        } else {
            return (
                <div>
                    <Carousel>
                        {this.articles
                            .filter(a => a.importance === 1)
                            .map((a, index) =>
                                index === 1 ? (
                                    <NavLink
                                        key={index}
                                        style={{
                                            backgroundImage:
                                                'url("' + a.image + '")'
                                        }}
                                        to={'/article/' + a.id}
                                        className="carousel-item active carouselBackground"
                                    >
                                        <h3 className="carouselText">
                                            {a.title}
                                        </h3>
                                        <h4 className="carouselText">
                                            {new Date(
                                                a.creation_date
                                            ).toLocaleString()}
                                        </h4>
                                    </NavLink>
                                ) : (
                                    <NavLink
                                        key={index}
                                        style={{
                                            backgroundImage:
                                                'url("' + a.image + '")'
                                        }}
                                        to={'/article/' + a.id}
                                        className="carousel-item carouselBackground"
                                    >
                                        <h3 className="carouselText">
                                            {a.title}
                                        </h3>
                                        <h4 className="carouselText">
                                            {new Date(
                                                a.creation_date
                                            ).toLocaleString()}
                                        </h4>
                                    </NavLink>
                                )
                            )}
                    </Carousel>
                    <div className="card-column-wrapper">
                        <div className="card-columns">
                            {this.articlesSliced.map(s => (
                                <Card
                                    key={s.id}
                                    title={s.title}
                                    image={s.image}
                                    id={s.id}
                                    alt={s.alt}
                                />
                            ))}
                        </div>
                    </div>
                    <div className="textAlignCenter">
                        <Button.Round onClick={this.moreArticles}>
                            Load more articles
                        </Button.Round>
                    </div>
                </div>
            );
        }
    }

    moreArticles() {
        this.articlesSliced = this.articles.slice(0, 5 + this.sliceFactor);
        // low increase for example purpose.
        this.sliceFactor += 5;
    }
}
