// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Card, Alert} from "./widgets.js";
import {Carousel} from "./widgets";
import {articleService} from "./services.js";

export class Home extends Component {

    articles = [];

    mounted(){
        articleService
            .getArticles()
            .then(articles => this.articles = articles)
            .catch((error: Error) => Alert.danger(error.message));
    }

    render(){

        return(
            <div>
                <Carousel/>
                <div id="card-column-wrapper">
                    <div className="card-columns">
                        {this.articles.map(s => <Card key={s.id} title={s.title} image={s.image} id={s.id} alt={s.alt}/>)
                        }
                    </div>
                </div>
            </div>
        )
    }
}
