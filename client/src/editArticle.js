// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Alert, Form} from "./widgets.js"
import {Category, Article, articleService} from './services.js';
import {createHashHistory} from "history";
import {ConfirmBox} from "./widgets";

const history = createHashHistory();


export class EditArticle extends Component<{ match: { params: { id: number } } }>{

    article = new Article();
    error : boolean = false;
    categories : Category[] = [];


    mounted(){
        articleService
            .getArticle(this.props.match.params.id)
            .then(articles => {if(articles[0] != null){
                this.article.id = this.props.match.params.id;
                this.article.title = articles[0].title;
                this.article.text = articles[0].text;
                this.article.image = articles[0].image;
                this.article.alt = articles[0].alt;
                this.article.image_text = articles[0].image_text;
                this.article.creation_date = articles[0].creation_date;
                this.article.category = articles[0].category;
                this.article.importance = articles[0].importance;
                this.article.paragraphs = this.article.text.split(/[\r\n]+/);
            } else {
                this.error = true;
            }
            })
            .catch((error: Error) => Alert.danger(error.message));


        articleService.getCategories()
            .then((categories)=>{
                this.categories = categories})
            .catch((error: Error) => Alert.danger(error.message));
    }

    render(){
        return(
            <div>
                <ConfirmBox modalId="cancelEditConfirmBox" modalHeader="Cancel edit" modalBody="Are you sure you want to cancel edit?" onClick={this.cancel}/>
                <Form article={this.article} dataTarget="cancelEditConfirmBox" onSubmit={this.save}/>
            </div>
        )
    }

    cancel(){
        history.goBack();
    }

    save(event : SyntheticInputEvent<HTMLFormElement>){
        event.preventDefault();

        articleService
            .updateArticle(this.article)
            .then(data => {
                console.log(data);
                history.push('/article/' + this.article.id);
                    Alert.success("Article updated")})
            .catch((error: Error) => Alert.danger(error.message));
    }
}