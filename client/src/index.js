// @flow

import ReactDOM from 'react-dom';
import * as React from 'react';
import { HashRouter, Route } from 'react-router-dom';
import { Home } from './pages/frontPage.js';
import { NewArticle } from './pages/newArticle.js';
import { ViewArticle } from './pages/viewArticle.js';
import { Alert } from './widgets/alert.js';
import { Search } from './pages/search.js';
import { ArticleByCategory } from './pages/viewByCategory';
import { EditArticle } from './pages/editArticle.js';
import { Menu } from './widgets/menu.js';
import { Login } from './pages/login.js';
import { SignUp } from './pages/signUp.js';
import { createStore } from 'redux';
import allReducer from './redux/reducers';
import { Provider } from 'react-redux';
import { Spinner } from './pages/justToShowLoadingSpinners.js';
import { MyArticles } from './pages/myArticles';

const root = document.getElementById('root');

/*
Creates a Redux store that holds the complete state tree.
Also connects the redux devtools extension for google chrome. One thing the extension can be used for is to watch the current state of the store at all times.
 */
const store = createStore(
    allReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

if (root)
    ReactDOM.render(
        <Provider store={store}>
            <HashRouter>
                <div>
                    <Menu />
                    <Alert />
                    <Route exact path="/" component={Home} />
                    <Route exact path="/login" component={Login} />
                    <Route
                        exact
                        path="/article/myArticles"
                        component={MyArticles}
                    />
                    <Route exact path="/signup" component={SignUp} />
                    <Route
                        exact
                        path="/article/search/:search"
                        component={Search}
                    />
                    <Route exact path="/article/new" component={NewArticle} />
                    <Route
                        exact
                        path="/article/:id(\d+)"
                        component={ViewArticle}
                    />
                    <Route
                        exact
                        path="/article/:id(\d+)/edit"
                        component={EditArticle}
                    />
                    <Route
                        exact
                        path="/article/:category(\D+)"
                        component={ArticleByCategory}
                    />
                    <Route exact path="/login/spinner" component={Spinner} />
                </div>
            </HashRouter>
        </Provider>,
        root
    );
