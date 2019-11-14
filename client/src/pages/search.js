// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Alert, Card} from "../widgets/widgets";
import {Article, articleService} from "../services";

export class Search extends Component <{ match: { params: { search: string } } }>{

    input : string = this.props.match.params.search;
    articles : Article[] = [];

    mounted() {
        this.input = this.props.match.params.search;

        articleService
            .getArticles()
            .then(articles => this.articles = articles.filter(a => a.title.toUpperCase().includes(this.input.toUpperCase())))
            .catch((error: Error) => Alert.danger(error.message));
    }


    render(){
        if(this.articles.length === 0){
            return(
                <div>
                    <h1>Search result: </h1>
                    <strong>Your search input "{this.input}" yielded no results.</strong>
                </div>
            )
        } else {
            return (
                <div>
                    <div className="card-columns">
                        {this.articles.map(s => <Card key={s.id} title={s.title} description={s.text}
                                                      image={s.image} id={s.id} alt={s.alt}/>)
                        }
                    </div>
                </div>
            )
        }
    }
/*

            this.articles.length() == 0 ?
                <P> </p>
                :
            <div>
                <div className="card-columns">
                    {this.articles.map(s => <Card key={s.id} title={s.title} description={s.text} image={s.image} id={s.id} alt={s.alt}/>)
                    }
                </div>
            </div>
 */
}
