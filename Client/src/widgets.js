// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {createHashHistory} from "history";

const history = createHashHistory();

export class Menu extends Component {
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
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
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
export class Menu extends Component {
    render() {
        return (
            <nav id="navigationBar" className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup"
                        aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"/>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav mr-auto mt-2 mt-lg-0">
                        <NavLink className="nav-link" to="/article/new">New article</NavLink>
                        <NavLink className="nav-link" to="/courses">Nothing</NavLink>
                    </div>
                    <div className="nav-item dropdown mt-2 mt-lg-0">
                        <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                           data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Dropdown
                        </a>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="#">Action</a>
                            <a className="dropdown-item" href="#">Another action</a>
                            <div className="dropdown-divider"></div>
                            <a className="dropdown-item" href="#">Something else here</a>
                        </div>
                    </div>
                    <form className="form-inline my-2 my-lg-0" >
                        <input className="form-control mr-sm-2" type="search" placeholder="Search"
                               aria-label="Search" id="searchInput"/>
                        <button className="btn btn-outline-success my-2 my-sm-0" onClick={this.search}>Search</button>
                    </form>
                    <div>
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
*/

export class Carousel extends Component{
    render(){
        return(
            <div id="carouselExampleControls" className="carousel slide" data-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <p className ="RENAME-ME-PLZ">Hei</p>
                    </div>
                    <div className="carousel-item">
                        <p className ="RENAME-ME-PLZ">Hei nr 2</p>
                    </div>
                    <div className="carousel-item">
                        <p className ="RENAME-ME-PLZ">Hei nr 3</p>
                    </div>
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


export class Card extends Component<{ title: React.Node, image: React.Node, description: React.Node, id: React.Node, alt: React.Node}> {
    render() {
        return (
            <div className="card card-pretty">
                <img src={this.props.image} className="card-img-top" alt={this.props.alt}/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <div className="card-text">{this.props.description}</div>
                    <NavLink to={'/article/' + +this.props.id} className="stretched-link">Les mer</NavLink>
                </div>
            </div>
        );
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

class ButtonPrimary extends Component<{ onClick : () => mixed, children?: React.Node }> {
    render(){
        return (
            <button type="button" className="btn btn-primary" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}

class ButtonDanger extends Component<{ onClick : () => mixed, children?: React.Node }> {
    render(){
        return (
            <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}

export class Button{
    static Danger = ButtonDanger;
    static Primary = ButtonPrimary;
}