// @flow


import ReactDOM from "react-dom";

import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import {createHashHistory} from "history";
import { Home } from './pages/frontPage.js';
import { NewArticle } from './pages/newArticle.js';
import { ViewArticle } from './pages/viewArticle.js';
import { Alert } from './widgets/widgets.js';
import { Search } from './pages/search.js';
import { ArticleByCategory } from './pages/viewByCategory';
import { EditArticle } from './pages/editArticle.js';
import { Menu } from './widgets/menu.js'
import { Login } from './pages/login.js'
import { SignUp } from './pages/signUp.js'

import {currentUser} from "./sharedState.js";


/*
function requireAuth(nextState, replace, next) {
    console.log("stauts " + currentUser.loggedIn);
    if (currentUser.loggedIn === true) {
        replace({
            pathname: "/login",
            state: {nextPathname: nextState.location.pathname}
        });
        next();
    }
    next();
}
*/
/*
<Route exact path="/home" render={() => (
  isLoggedIn() ? (
    <Redirect to="/front"/>
  ) : (
    <Home />
  )
)}/>
 */

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