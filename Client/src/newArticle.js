// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Button, Alert} from "./widgets.js"
import {Article, articleService} from './services.js';
import {createHashHistory} from "history";

const history = createHashHistory();


export class NewArticle extends Component {
    article = new Article;

    render(){
        return(
            <form>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input type="text" className="form-control" id="title" placeholder="Write your title here"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.article) this.article.title = event.target.value;
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="teksten">Title</label>
                    <input type="text" className="form-control" id="teksten" placeholder="blabla"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.article) this.article.text = event.target.value;
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Title</label>
                    <input type="text" className="form-control" id="image" placeholder="bildelink"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.article) this.article.image = event.target.value;
                           }}/>
                </div>

                <div className="form-group">
                    <label htmlFor="alt">Title</label>
                    <input type="text" className="form-control" id="alt" placeholder="ikkje skriv her, er alten"/>
                </div>

                <div className="form-group">
                    <label htmlFor="importance">Title</label>
                    <input type="text" className="form-control" id="importance" placeholder="importance"/>
                </div>
                <Button.Primary onClick={this.save}>Save</Button.Primary>
                <Button.Danger onClick={this.cancel}>Cancel</Button.Danger>
            </form>
        )
    }

    save(){
        console.log("Save");
        if(this.article.title !== undefined) {
            console.log("Save inni");

            this.article.category = "Kultur";
            this.article.importance = 1;
            this.article.alt = "fwe";
            this.article.creator = "user2";
            this.article.image_text = "This image is cool";

            articleService
                .postArticle(this.article)
                .then((e)=>{console.log("FIKK FRA SERVER: " + e)
                    history.push('/article/' + e);
                })
                .catch((error: Error) => Alert.danger(error.message));
        }
    }

    cancel(){

    }
}