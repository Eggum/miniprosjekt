// @flow

import * as React from 'react';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import { Component } from 'react-simplified';
import { Category, articleService } from '../services';
import { NavLink } from 'react-router-dom';
import { Alert } from './alert';
import { connect } from 'react-redux';
import { changeId, changeName, logOut } from '../redux/actions';
const history: HashHistory = createHashHistory();

/**
 * The menu bar and header of the website. Uses bootstrap navbar.
 * If the user is not logged in, a log in button is displayed in the top right corner.
 * If the user is logged in, the log in button is replaced by the users username.
 * If the user clicks their username (displayed when logged in) a dropdown menu is shown where the user can logout, sign up a new user or sign in as a different user.
 * If the user logs out state is updated and token is removed from storage.
 */

// The states that are going to be mapped to the component as properties.
function mapStateToProps(state) {
    return {
        stateName: state.name,
        isLogged: state.isLogged
    };
}

// The redux actions that are going to be mapped to the component as properties.
function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => dispatch(logOut()),
        changeID: newID => dispatch(changeId(newID)),
        changeName: newName => dispatch(changeName(newName))
    };
}

// The property types of the component.
type prop = {
    stateName: string,
    isLogged: boolean,
    logoutUser: () => mixed,
    changeID: number => mixed,
    changeName: string => mixed
};

/*
If the user scrolls down on the website, the menu bar is collapsed.
If the user scrolls up from anywhere on the site, the menubar is displayed.
 */
let prevScrollPosition = window.pageYOffset;

window.onscroll = function() {
    let currentScrollPosition = window.pageYOffset;
    let navigationBar = document.getElementById('navigationBar');

    if (navigationBar !== null) {
        if (prevScrollPosition > currentScrollPosition) {
            navigationBar.style.top = '0';
        } else {
            navigationBar.style.top = '-50px';
        }
    }
    prevScrollPosition = currentScrollPosition;
};

class MenuBar extends Component<prop> {
    categories: Category[] = [];

    mounted() {
        articleService
            .getCategories()
            .then(categories => {
                this.categories = categories;
            })
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <nav
                id="navigationBar"
                className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top"
            >
                <NavLink className="navbar-brand" to="/">
                    Puseavisa
                </NavLink>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNavAltMarkup"
                    aria-controls="navbarNavAltMarkup"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" />
                </button>
                <div
                    className="collapse navbar-collapse"
                    id="navbarNavAltMarkup"
                >
                    <div className="navbar-nav">
                        <NavLink className="nav-link" to="/article/new">
                            New article
                        </NavLink>
                    </div>
                    <div className="nav-item dropdown navbar-nav">
                        <span
                            className="nav-link dropdown-toggle"
                            style={{ cursor: 'pointer' }}
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Categories
                        </span>
                        <div
                            className="dropdown-menu"
                            aria-labelledby="navbarDropdown"
                        >
                            {this.categories.map((c, index) => (
                                <NavLink
                                    key={index}
                                    className="dropdown-item"
                                    to={'/article/' + c.category}
                                >
                                    {c.category}
                                </NavLink>
                            ))}
                        </div>
                    </div>
                    <form className="form-inline ml-auto">
                        <input
                            className="form-control mr-sm-2"
                            type="search"
                            placeholder="Search"
                            aria-label="Search"
                            id="searchInput"
                        />
                        <button
                            className="btn btn-outline-info my-2 my-sm-0"
                            onClick={this.search}
                        >
                            Search
                        </button>
                    </form>
                    <div className="navbar-nav ">
                        {this.props.isLogged ? (
                            <div className="nav-item dropdown navbar-nav">
                                <span
                                    className="nav-link dropdown-toggle"
                                    style={{ cursor: 'pointer' }}
                                    id="userDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {this.props.stateName}
                                </span>
                                <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="userDropdown"
                                >
                                    <NavLink
                                        className="dropdown-item"
                                        to="/article/myArticles"
                                    >
                                        My articles
                                    </NavLink>
                                    <div className="dropdown-divider" />
                                    <NavLink
                                        className="dropdown-item"
                                        to="/login"
                                    >
                                        Change user
                                    </NavLink>
                                    <NavLink
                                        className="dropdown-item"
                                        to="/signUp"
                                    >
                                        New user
                                    </NavLink>
                                    <div className="dropdown-divider" />
                                    <button
                                        className="dropdown-item"
                                        onClick={this.logout}
                                    >
                                        Log out
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <NavLink className="nav-link" to="/login">
                                Login
                            </NavLink>
                        )}
                    </div>
                </div>
            </nav>
        );
    }

    logout() {
        this.props.changeID(1);
        this.props.logoutUser();
        this.props.changeName('Anonym');
        localStorage.removeItem('myToken');
    }

    search() {
        let searchInputField = document.getElementById('searchInput');
        if (
            searchInputField != null &&
            searchInputField instanceof HTMLInputElement
        ) {
            let input = searchInputField.value;
            if (input !== '') {
                history.push('/article/search/' + input);
            }
        }
    }
}

/*
Connects the state and actions to the component.
The original component is not changed. Instead, connect function returns a new, connected component class that wraps the component passed in.
 */
export const Menu = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
