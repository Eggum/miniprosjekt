// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Alert, Button} from './widgets.js'
import {createHashHistory} from "history";
import {Article, articleService} from "./services.js";




const history = createHashHistory();

export class ViewArticle extends Component<{ match: { params: { id: number } } }>{

    article = new Article();
    error : boolean = false;


    /*
    id : number = this.props.match.params.id;
    title : string = "";
    text : string = "";
    creationDate : string = "";
    image : string = "";
    alt : string = "";
    category : string = "";
    importance : boolean = 200;
    creator  : string = "";
    error : boolean = false;
*/

    mounted(){
        articleService
            .getArticle(this.props.match.params.id)
            .then(articles => {if(articles[0] != null){
                this.article.id = this.props.match.params.id;
                this.article.title = articles[0].title;
                this.article.text = articles[0].text;
                this.article.image = articles[0].image;
                this.article.creation_date = articles[0].creation_date;
                this.article.category = articles[0].category;
                this.article.importance = articles[0].importance;
            } else {
                this.error = true;
            }
            })
            .catch((error: Error) => Alert.danger(error.message));
    }




    render(){
        if (this.error === true) {
            Alert.danger('Article not found: ' + this.props.match.params.id);
            history.push('/');
            return null; // Return empty object (nothing to render)
        }

        return(
            <article>
                <img src={this.article.image} alt="Need something here"/>
                <h1>{this.article.title}</h1>
                <p>{this.article.text}</p>
                <p>{this.article.creation_date}</p>
                <p>{this.article.category}</p>
                <Button.Primary onClick={this.save}>Edit</Button.Primary>
                <Button.Danger onClick={this.delete}>Delete</Button.Danger>
            </article>
        )
    }

    save(){

    }

    delete(){
        console.log("Skal slette artikkelen");
        articleService
            .deleteArticle(this.props.match.params.id)
            .then(history.push('/'))
            .catch((error: Error) => Alert.danger(error.message));

    }
}