// @flow


import ReactDOM from "react-dom";

import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {createHashHistory} from "history";
import { Home } from './frontPage.js';
import { NewArticle } from './newArticle.js';
import { ViewArticle } from './viewArticle.js';
import { Alert } from './widgets.js';
import { Search } from './search.js';
import { ArticleByCategory } from './viewByCategory';
import { EditArticle } from './editArticle.js';
import { Menu } from './menu.js'
import { Login } from './login.js'
import { SignUp } from './signUp.js'




const root = document.getElementById('root');
if (root)
    ReactDOM.render(
        <HashRouter>
            <div>
                <Menu />
                <Alert />
                <Route exact path="/" component={Home} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/signup" component={SignUp} />
                <Route exact path="/search/:search" component={Search}/>
                <Route exact path="/article/new" component={NewArticle} />
                <Route exact path="/article/:id(\d+)" component={ViewArticle} />
                <Route exact path="/article/:id(\d+)/edit" component={EditArticle} />
                <Route exact path="/article/:category(\D+)" component={ArticleByCategory} />
            </div>
        </HashRouter>,
        root
    );