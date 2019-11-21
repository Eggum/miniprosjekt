// @flow

import * as React from 'react';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import { Component } from 'react-simplified';
import { Category, articleService } from '../services';
import { NavLink } from 'react-router-dom';
import { Alert } from './alert';
import { useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { changeId, logOut } from '../redux/actions';

const history: HashHistory = createHashHistory();

// maps state to component as prop!
function mapStateToProps(state) {
    return {
        stateName: state.name,
        isLogged: state.isLogged
    };
}

function mapDispatchToProps(dispatch) {
    return {
        logoutUser: () => dispatch(logOut()),
        changeID: newID => dispatch(changeId(newID))
    };
}

type prop = {
    stateName: string,
    isLogged: boolean,
    logoutUser: () => mixed,
    changeID: number => mixed
};

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
                    Home
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
                        <a
                            className="nav-link dropdown-toggle"
                            href="#"
                            id="navbarDropdown"
                            role="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            Categories
                        </a>
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
                                <a
                                    className="nav-link dropdown-toggle"
                                    href="#"
                                    id="userDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    {this.props.stateName}
                                </a>
                                <div
                                    className="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="userDropdown"
                                >
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
    }

    search() {
        let searchInputField = document.getElementById('searchInput');
        if (
            searchInputField != null &&
            searchInputField instanceof HTMLInputElement
        ) {
            let input = searchInputField.value;
            if (input !== '') {
                history.push('/search/' + input);
            }
        }
    }
}

export const Menu = connect(
    mapStateToProps,
    mapDispatchToProps
)(MenuBar);
