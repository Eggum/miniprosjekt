// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Alert, ConfirmBox} from '../widgets/widgets.js';
import {Button} from '../widgets/buttons.js';
import {createHashHistory} from "history";
import {Article, articleService, Comment, commentService} from "../services.js";
import {NavLink} from "react-router-dom";
import {CommentSection} from '../widgets/viewArticleComponents.js';
import {connect} from "react-redux";



const history = createHashHistory();


// maps state to component as prop!
function mapStateToProps(state) {
    return {
        isLogged : state.isLogged,
        stateID: state.id
    };
}

class ViewArticleComp extends Component<{ match: { params: { id: number } } , isLogged : boolean, stateID : number}>{

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

                    {this.props.isLogged ?
                        <div>
                            <Button.Primary onClick={this.edit}>Edit</Button.Primary>
                            <Button.ModalDanger dataTarget="deleteConfirmBox">Delete article</Button.ModalDanger>
                        </div>
                        : null
                    }


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
            this.newComment.creator = this.props.stateID;
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

export const ViewArticle = connect(mapStateToProps)(ViewArticleComp);
