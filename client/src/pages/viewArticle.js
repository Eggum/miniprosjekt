// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Alert, ConfirmBox} from '../widgets/widgets.js';
import {Button} from '../widgets/buttons.js';
import {createHashHistory} from "history";
import {Article, articleService, Comment, commentService} from "../services.js";
import {NavLink} from "react-router-dom";
import {CommentSection} from '../widgets/viewArticleComponents.js';



const history = createHashHistory();




export class ViewArticle extends Component<{ match: { params: { id: number } } }>{

    article : Article = new Article();
    error : boolean = false;
    comments : Array<Comment> = [];
    newComment : Comment = new Comment();

    mounted(){
        articleService
            .getArticle(this.props.match.params.id)
            .then(article => {if(article != null){
                this.article.id = this.props.match.params.id;
                this.article.title = article.title;
                this.article.text = article.text;
                this.article.image = article.image;
                this.article.alt = article.alt;
                this.article.image_text = article.image_text;
                this.article.creation_date = article.creation_date;
                this.article.category = article.category;
                this.article.importance = article.importance;
                this.article.paragraphs = this.article.text.split(/[\r\n]+/);
            /*
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
                */
            } else {
                this.error = true;
            }
            })
            .catch((error: Error) => Alert.danger(error.message));


        commentService.getComments(this.props.match.params.id)
            .then(comments => this.comments = comments);
    }

    render(){
        if (this.error === true || this.article == null) {
            Alert.danger('Article not found: ' + this.props.match.params.id);
            history.push('/');
            return null; // Return empty object (nothing to render)
        }

        return(
            <div>
                    <ConfirmBox modalId="deleteConfirmBox" modalHeader="Delete article" modalBody="Are you sure you want to delete article?" onClick={this.delete}/>
                <article>
                    <img src={this.article.image} alt="Need something here"/>
                    <h1>{this.article.title}</h1>
                    <p>{this.article.creation_date}</p>
                    <NavLink to={'/article/' + this.article.category}>{this.article.category}</NavLink>
                   {this.article.paragraphs.map((p, index) => (
                        <p key={index}>{p}</p>
                    ))}
                    <Button.Primary onClick={this.edit}>Edit</Button.Primary>
                    <Button.ModalDanger dataTarget="deleteConfirmBox">Delete article</Button.ModalDanger>

                    <CommentSection comments={this.comments} newComment={this.newComment} onClick={this.publish_comment} onDelete={this.delete_comment}/>
                </article>
            </div>
        )
    }

    edit(){
        history.push('/article/' + +this.props.match.params.id + '/edit');
    }

    delete_comment(comment : Comment){
        console.log("sletter; " + comment.text);
        commentService.deleteComment(comment)
            .then(res => {
                console.log(res);
                commentService.getComments(this.props.match.params.id)
                    .then(comments => this.comments = comments)
            });

    }

    publish_comment(){
        console.log("publish");
        if(this.newComment.text !== "" && this.newComment.text !== undefined && this.newComment.text !== null) {
            this.newComment.creator = 1;
            this.newComment.article = this.props.match.params.id;

            commentService.postComment(this.newComment)
                .then(e => {
                    console.log(e);
                    commentService.getComments(this.props.match.params.id)
                        .then(comments => this.comments = comments)
                });

        } else {
            console.log("idk" + this.newComment.text);
        }
    }

    delete(){
        articleService
            .deleteArticle(this.props.match.params.id)
            .then(()=>{
                Alert.success("Article successfully deleted");
                history.push('/')})
            .catch((error: Error) => {
                Alert.danger(error.message);
            });
    }
}