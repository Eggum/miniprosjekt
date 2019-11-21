// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Card, Alert } from '../widgets/widgets.js';
import { Carousel } from '../widgets/widgets';
import { Article, articleService } from '../services.js';
import { NavLink } from 'react-router-dom';
import { Button } from '../widgets/buttons.js';

export class Home extends Component {
    articles: Array<Article> = [];
    articlesSliced: Array<Article> = [];
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
                                    <h3 className="carouselText">{a.title}</h3>
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
                                    <h3 className="carouselText">{a.title}</h3>
                                    <h4 className="carouselText">
                                        {new Date(
                                            a.creation_date
                                        ).toLocaleString()}
                                    </h4>
                                </NavLink>
                            )
                        )}
                </Carousel>
                <div id="card-column-wrapper">
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

    moreArticles() {
        this.articlesSliced = this.articles.slice(0, 5 + this.sliceFactor);
        this.sliceFactor += 5;
    }
}
