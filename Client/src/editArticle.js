// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Alert} from "./widgets.js"
import {Button} from "./buttons.js"
import {Article, articleService} from './services.js';
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
                <form>
                    <div className="form-group">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" value={this.article.title}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                   if (this.article) this.article.title = event.target.value;
                               }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="image">Article image</label>
                        <input type="text" className="form-control" id="image" value={this.article.image}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                   if (this.article) this.article.image = event.target.value;
                               }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="imageText">Image text</label>
                        <input type="text" className="form-control" id="imageText" value={this.article.image_text}
                               onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                   if (this.article) this.article.image_text = event.target.value;
                               }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="alt">Image alt</label>
                        <input type="text" className="form-control" id="alt" value={this.article.alt} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.article) this.article.alt = event.target.value;
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="importance">Empty</label>
                        <input type="text" className="form-control" id="importance" value={this.article.importance}/>
                    </div>
                    <label className="radio-inline">Category</label>


                    <div className="from-group">
                        {this.categories.map((c, index) => (
                            this.article.category === c.category ?
                                <div className="form-check form-check-inline">
                                    <input checked className="form-check-input" type="radio" name="inlineRadioOptions" id={"radioButtonCategory" + index}
                                           value={c.category} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                           if (this.article) this.article.category = event.target.value;}}/>
                                    <label className="form-check-label" htmlFor={"radioButtonCategory" + index}>{c.category}</label>
                                </div>
                                :
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
                        <textarea className="form-control" rows="20" id="articleText" value={this.article.text} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.article) this.article.text = event.target.value;
                        }}/>
                    </div>
                    <Button.Primary onClick={this.save}>Save</Button.Primary>
                    <Button.ModalDanger  dataTarget="cancelEditConfirmBox">Cancel</Button.ModalDanger>
                </form>
            </div>
        )
    }

    cancel(){
        history.goBack();
  //      history.push('/article/' + +this.props.match.params.id);
    }

    save(){

        articleService
            .updateArticle(this.article)
            .then( Alert.success("Article updated"))
            .catch((error: Error) => Alert.danger(error.message));
        history.push('/article/' + this.article.id)
    }
}