// @flow

import * as React from 'react';
import {createHashHistory} from "history";
import {Component} from "react-simplified";
import {articleService} from "./services";
import {NavLink} from "react-router-dom";
import {Alert} from "./widgets";


const history = createHashHistory();



let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navigationBar").style.top = "0";
    } else {
        document.getElementById("navigationBar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
};




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