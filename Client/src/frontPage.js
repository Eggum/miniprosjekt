// @flow

import * as React from 'react';
import { Component } from "react-simplified";
import { Card, Alert } from "./widgets.js";
import { Carousel } from "./widgets";
import { articleService } from "./services.js";
import { NavLink } from 'react-router-dom';


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
                <Carousel>
                    {this.articles.filter(a => a.importance === 1).map((a, index) =>
                        index === 1 ?
                            <NavLink style={{'background-image' : 'url("' + a.image + '")'}}  to={"/article/" + a.id} className="carousel-item active ostepop">
                                <h3 className ="RENAME-ME-PLZ">{a.title}</h3>
                                <h4 className ="RENAME-ME-PLZ">{a.creation_date}</h4></NavLink>
                            :
                            <NavLink  style={{'background-image' : 'url("' + a.image + '")'}}  to={"/article/" + a.id} className="carousel-item ostepop">
                                <h3 className ="RENAME-ME-PLZ">{a.title}</h3>
                                <h4 className ="RENAME-ME-PLZ">{a.creation_date}</h4></NavLink>
                )}
                </Carousel>
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
