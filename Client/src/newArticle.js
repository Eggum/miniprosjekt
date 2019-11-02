// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Alert} from "./widgets.js"
import {Button} from "./buttons.js"
import {Article, articleService} from './services.js';
import {createHashHistory} from "history";

const history = createHashHistory();


export class NewArticle extends Component {
    article = new Article;

    categories : Category[] = [];

    mounted(){
        articleService.getCategories()
            .then((categories)=>{
                this.categories = categories})
            .catch((error: Error) => Alert.danger(error.message));
    }

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
                    <label htmlFor="image">Article image</label>
                    <input type="text" className="form-control" id="image" placeholder="Write image url"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.article) this.article.image = event.target.value;
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="imageText">Image text</label>
                    <input type="text" className="form-control" id="imageText" placeholder="Write image text"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.article) this.article.image_text = event.target.value;
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="alt">Image alt</label>
                    <input type="text" className="form-control" id="alt" placeholder="image alt" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                        if (this.article) this.article.alt = event.target.value;
                    }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="importance">Empty</label>
                    <input type="text" className="form-control" id="importance" placeholder="importance"/>
                </div>
                <label className="radio-inline">Category</label>


                <div className="from-group">
                    {this.categories.map((c, index) => (
                        <div className="form-check form-check-inline">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id={"radioButtonCategory" + index}
                                   value={c.category} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                if (this.article) this.article.category = event.target.value;}}/>
                            <label className="form-check-label" htmlFor={"radioButtonCategory" + index}>{c.category}</label>
                        </div>
                    ))}
                </div>
                <div className="form-group">
                </div>
                <div className="form-group">
                    <label htmlFor="articleText">Text</label>
                    <textarea className="form-control" rows="20" id="articleText" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                        if (this.article) this.article.text = event.target.value;
                    }}/>
                </div>
                <Button.Primary onClick={this.save}>Save</Button.Primary>
                <Button.Danger onClick={this.cancel}>Cancel</Button.Danger>
            </form>
        )
    }

    save(){
        if(this.article.title !== undefined) {

            this.article.importance = 1;
            this.article.creator = "user2";

            articleService
                .postArticle(this.article)
                .then((articleID)=>{
                    history.push('/article/' + articleID);
                })
                .catch((error: Error) => Alert.danger(error.message));
        }
    }

    cancel(){
        history.push('/');
    }
}