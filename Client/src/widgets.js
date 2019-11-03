// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {createHashHistory} from "history";
import {Article, articleService} from "./services.js";


const history = createHashHistory();

export class Menu extends Component {


    categories : Category[] = [];

    mounted(){
        console.log("Meny mounted blir kjørt");
        articleService.getCategories()
            .then((categories)=>{
                this.categories = categories})
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <nav id="navigationBar" className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/article/new">New article</NavLink>
                        <NavLink className="nav-link" to="/courses">Nothing</NavLink>
                    </div>
                    <div className="nav-item dropdown navbar-nav">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Categories
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            {this.categories.map((c, index) => (
                                <NavLink key={index} className="dropdown-item" to={"/article/" + c.category}>{c.category}</NavLink>
                            ))}
                            <div className="dropdown-divider"></div>
                        </div>
                    </div>
                    <form className="form-inline ml-auto" >
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               aria-label="Search" id="searchInput"/>
                        <button className="btn btn-outline-info my-2 my-sm-0" onClick={this.search}>Search</button>
                    </form>
                    <div className="navbar-nav ">
                        <NavLink className="nav-link" to="/courses">Nothing</NavLink>
                    </div>
                </div>
            </nav>
        );
    }

    search(){
        let input = document.getElementById('searchInput').value;
        if(input !== ""){

            //    Search.input = input;
            history.push('/search/' + input);

        }
    }
}
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
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
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
