// @flow


import ReactDOM from "react-dom";

import * as React from 'react';
import { Component } from 'react-simplified';
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {createHashHistory} from "history";

import { Home } from './frontPage.js';
import { NewArticle } from './newArticle.js';
import { ViewArticle } from './viewArticle.js';
import { Alert, Menu } from './widgets.js';
import { Search } from './search.js';
import { ArticleByCategory } from './viewByCategory';
import { EditArticle } from './editArticle.js';






var prevScrollpos = window.pageYOffset;
window.onscroll = function() {
    var currentScrollPos = window.pageYOffset;
    if (prevScrollpos > currentScrollPos) {
        document.getElementById("navigationBar").style.top = "0";
    } else {
        document.getElementById("navigationBar").style.top = "-50px";
    }
    prevScrollpos = currentScrollPos;
};



const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Menu />
                <Alert />
                <Route exact path="/" component={Home} />
                <Route exact path="/search/:search" component={Search}/>
                <Route exact path="/article/new" component={NewArticle} />
                <Route exact path="/article/:id(\d+)" component={ViewArticle} />
                <Route exact path="/article/:id(\d+)/edit" component={EditArticle} />
                <Route exact path="/article/:category" component={ArticleByCategory} />
            </div>
        </HashRouter>,
        root
    );