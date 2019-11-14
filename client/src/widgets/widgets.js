// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {createHashHistory} from "history";
import {Category, Article, articleService} from "../services.js";
import {Button} from "./buttons";


const history = createHashHistory();

/*

                    <div className="carousel-item active">
                        <p className ="RENAME-ME-PLZ">Hei</p>
                    </div>
                    <div className="carousel-item">
                        <p className ="RENAME-ME-PLZ">Hei nr 2</p>
                    </div>
                    <div className="carousel-item">
                        <p className ="RENAME-ME-PLZ">Hei nr 3</p>
                    </div>
 */
export class Carousel extends Component<{children?: React.Node }>{
    render(){
        return(
            <div id="carouselExampleControls" className="carousel slide prettyCarousel" data-ride="carousel">
                <div className="carousel-inner">
                    {this.props.children}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"/>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"/>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}

export class Form extends Component<{ article: Article, dataTarget : string,  onSubmit : (event: SyntheticInputEvent<HTMLFormElement>) => mixed}>{
    categories : Category[] = [];

    mounted(){
        articleService.getCategories()
            .then((categories)=>{
                this.categories = categories})
            .catch((error: Error) => Alert.danger(error.message));
    }

    render(){
        return(
            <form onSubmit={this.props.onSubmit} className="needs-validation">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input required type="text" className="form-control" id="title" maxLength="30" value={this.props.article.title} placeholder="Write your title here"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.props.article) this.props.article.title = event.target.value;
                           }}/>
                    <div className="invalid-feedback">
                        Please provide a valid zip.
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Article image</label>
                    <input required type="text" className="form-control" id="image" value={this.props.article.image} placeholder="Write image url"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.props.article) this.props.article.image = event.target.value;
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="imageText">Image text</label>
                    <input required type="text" className="form-control" maxLength="50" id="imageText" value={this.props.article.image_text} placeholder="Write image text"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.props.article) this.props.article.image_text = event.target.value;
                           }}/>
                </div>
                <div className="form-group">
                    <label htmlFor="alt">Image alt</label>
                    <input required type="text" className="form-control" id="alt" maxLength="50" value={this.props.article.alt}  placeholder="image alt"
                           onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                               if (this.props.article) this.props.article.alt = event.target.value;
                           }}/>
                </div>
                <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="importance" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                        if (this.props.article) if (event.target.checked){
                            this.props.article.importance = 1;
                        } else {
                            this.props.article.importance = 2;
                        }
                    }}/>
                        <label className="form-check-label" htmlFor="importance">Check this if article is IMPORTANT</label>
                </div>

                <label className="radio-inline">Category</label>

                <div className="from-group">
                    {this.categories.map((c, index) => (
                        this.props.article.category === c.category ?
                            <div className="form-check form-check-inline" key={index}>
                                <input checked className="form-check-input" type="radio" name="inlineRadioOptions" id={"radioButtonCategory" + index}
                                       value={c.category} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                    if (this.props.article) this.props.article.category = event.target.value;}}/>
                                <label className="form-check-label" htmlFor={"radioButtonCategory" + index}>{c.category}</label>
                            </div>
                            :
                            <div className="form-check form-check-inline" key={index}>
                                <input className="form-check-input" type="radio" name="inlineRadioOptions" id={"radioButtonCategory" + index}
                                       value={c.category} onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                    if (this.props.article) this.props.article.category = event.target.value;}}/>
                                <label className="form-check-label" htmlFor={"radioButtonCategory" + index}>{c.category}</label>
                            </div>
                    ))}
                </div>
                <div className="form-group">
                </div>
                <div className="form-group">
                    <label htmlFor="articleText">Text</label>
                    <textarea required className="form-control" rows="20" value={this.props.article.text} placeholder="Article text here" id="articleText"
                              onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                                  if (this.props.article) this.props.article.text = event.target.value;
                              }}/>
                </div>
                <Button.ModalDanger  dataTarget={this.props.dataTarget}>Cancel</Button.ModalDanger>
                <button className="btn btn-primary" type="submit">Save</button>
            </form>
        )
    }
}

export class Card extends Component<{ title: React.Node, image: React.Node, id: React.Node, alt: React.Node}> {
    render() {
        return (
            <div className="card card-pretty">
                <img src={this.props.image} className="card-img-top" alt={this.props.alt}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <NavLink to={'/article/' + +this.props.id} className="stretched-link">Les mer</NavLink>
                </div>
            </div>
        );
    }
}

export class ConfirmBox extends Component<{ modalId : React.Node, modalHeader : React.Node, modalBody : React.Node, onClick : () => mixed, children?: React.Node }>{
    render(){
        return(
            <div className="modal fade" id={this.props.modalId} tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">{this.props.modalHeader}</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            {this.props.modalBody}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal">No</button>
                            <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.props.onClick}>Yes</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}


/**
 * Renders alert messages using Bootstrap classes.
 */
export class Alert extends Component {
    alerts: { id: number, text: React.Node, type: string }[] = [];
    static nextId = 0;

    render() {
        return (
            <>
                {this.alerts.map((alert, i) => (
                    <div className="alert-pretty" key={alert.id}>
                        <div key={alert.id} className={'alert alert-' + alert.type} role="alert">
                            {alert.text}
                            <button
                                type="button"
                                className="close"
                                onClick={() => {
                                    this.alerts.splice(i, 1);
                                }}
                            >
                                &times;
                            </button>
                        </div>
                    </div>
                ))}
            </>
        );
    }

    static success(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'success' });
        });
    }

    static info(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'info' });
        });
    }

    static warning(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'warning' });
        });
    }

    static danger(text: React.Node) {
        // To avoid 'Cannot update during an existing state transition' errors, run after current event through setTimeout
        setTimeout(() => {
            for (let instance of Alert.instances()) instance.alerts.push({ id: Alert.nextId++, text: text, type: 'danger' });
        });
    }
}
