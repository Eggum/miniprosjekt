// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {Alert, Form} from "../widgets/widgets.js"
import {Article, articleService} from '../services.js';
import {createHashHistory} from "history";
import {ConfirmBox} from "../widgets/widgets";
import {connect} from "react-redux";
import {LoginPopUp} from "../widgets/loginAgainBox";
import type {ErrorResponse} from "../types";
declare var jQuery : any;

const history = createHashHistory();


// maps state to component as prop!
function mapStateToProps(state) {
    return {
        isLogged : state.isLogged,
        stateID: state.id
    };
}

class NewArticleComp extends Component <{stateID : number, isLogged : boolean}>{
    article : Article = new Article();
    //<form onSubmit = {this.save} className="needs-validation" ref={e => (this.form = e)}>
/*
    categories : Category[] = [];

    mounted(){
        articleService.getCategories()
            .then((categories)=>{
                this.categories = categories})
            .catch((error: Error) => Alert.danger(error.message));
    }
*/

    mounted(){
        if(!this.props.isLogged){
            jQuery('#loginPopUp').modal({
                backdrop: 'static',
                keyboard: false
            });

            jQuery('#loginPopUp').modal('show')
        }
    }

    render(){
        return(
            <div>
                <ConfirmBox modalId="cancelNewArticleConfirmBox" modalHeader="Cancel create article" modalBody="Are you sure you want to cancel new article?" onClick={this.cancel}/>
                <LoginPopUp ifCancel={this.cancel}/>
                <h1>New article</h1>
                <Form article={this.article} dataTarget="cancelNewArticleConfirmBox" onSubmit={this.save} />
            </div>
        )
    }



    save(event : SyntheticInputEvent<HTMLFormElement>){
        event.preventDefault();

        // article importance can be undefined at this point.
        if(this.article.importance !== 1) {
            this.article.importance = 2;
        }
        console.log("Importance: " + this.article.importance);
        console.log(this.props.stateID);
        this.article.creator = this.props.stateID;


        articleService
            .postArticle(this.article)
            .then((articleID)=>{
                history.push('/article/' + +articleID);
            })/*
            .catch((error: Error) => {
                window.scrollTo(0, 0);
                Alert.danger(error.message);
            });
            */
            .catch((error : ErrorResponse) => {
                Alert.danger(error.message);
                if (error.response.status === 401) {
                    jQuery('#loginPopUp').modal({
                        backdrop: 'static',
                        keyboard: false
                    });

                    jQuery('#loginPopUp').modal('show')
                }
            });
    }
    cancel(){
        history.goBack();
    }
}

export const NewArticle = connect(mapStateToProps)(NewArticleComp);
