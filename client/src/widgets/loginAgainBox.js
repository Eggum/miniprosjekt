// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User, userService } from '../services';
import { Alert } from './alert';
import { changeId, changeName, logIn, logOut } from '../redux/actions';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
declare var jQuery: any;
const history: HashHistory = createHashHistory();

/**
 * Bootstrap modal that pops-up if the user needs to log in again.
 * For instance if the server returns a 401 error because the token has expired when the user tries to delete an article.
 * The component updates the state to logged in on success or logged out if the user do not want to log in.
 */

// The property types of the component.
type props = {
    stateName: string,
    isLogged: boolean,
    changeName: string => mixed,
    loginUser: () => mixed,
    logoutUser: () => mixed,
    changeID: number => mixed,
    ifCancel: () => mixed
};

// The states that are going to be mapped to the component as properties.
function mapStateToProps(state) {
    return {
        stateName: state.name,
        isLogged: state.isLogged,
        stateID: state.id
    };
}

// The redux actions that are going to be mapped to the component as properties.
function mapDispatchToProps(dispatch) {
    return {
        changeName: newName => dispatch(changeName(newName)),
        loginUser: () => dispatch(logIn()),
        logoutUser: () => dispatch(logOut()),
        changeID: newID => dispatch(changeId(newID))
    };
}

class LoginAgainBox extends Component<props> {
    user: User = new User();

    render() {
        return (
            <div
                className="modal fade "
                id="loginPopUp"
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                Please login
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                                onClick={this.cancel}
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="" onSubmit={this.login}>
                                <h1>Login</h1>
                                <div className="form-group">
                                    <label htmlFor="username">Username</label>
                                    <input
                                        required
                                        className="form-control"
                                        id="username"
                                        placeholder="username"
                                        type="text"
                                        onChange={(
                                            event: SyntheticInputEvent<HTMLInputElement>
                                        ) => {
                                            if (this.user)
                                                this.user.username =
                                                    event.target.value;
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        required
                                        className="form-control"
                                        id="password"
                                        autoComplete="current-password"
                                        type="password"
                                        onChange={(
                                            event: SyntheticInputEvent<HTMLInputElement>
                                        ) => {
                                            if (this.user)
                                                this.user.password =
                                                    event.target.value;
                                        }}
                                    />
                                </div>
                                <div className="form-group">
                                    <button
                                        className="btn btn-primary"
                                        type="submit"
                                    >
                                        Login
                                    </button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-link"
                                data-dismiss="modal"
                                onClick={this.signUp}
                            >
                                Sign up
                            </button>
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                                onClick={this.cancel}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    signUp() {
        this.props.changeName('Anonym');
        this.props.changeID(1);
        this.props.logoutUser();

        history.push('/signUp');
    }

    cancel() {
        Alert.warning('You are not logged in.');
        this.props.changeName('Anonym');
        this.props.changeID(1);
        this.props.logoutUser();

        // ifCancel if a function sent in, in case the program needs extra handling when closing the loginAgainBox.
        if (this.props.ifCancel) {
            this.props.ifCancel();
        }
    }

    login(event: SyntheticInputEvent<HTMLFormElement>) {
        event.preventDefault();

        userService
            .loginUser(this.user)
            .then(res => {
                if (res != null) {
                    Alert.info('You are logged in');
                    localStorage.setItem('myToken', res.jwt);
                    this.props.changeName(this.user.username);
                    this.props.changeID(res.id);
                    this.props.loginUser();
                }
                jQuery('#loginPopUp').modal({
                    backdrop: 'static',
                    keyboard: true
                });

                jQuery('#loginPopUp').modal('hide');
            })
            .catch((error: Error) => {
                this.props.changeName('Anonym');
                this.props.changeID(1);
                this.props.logoutUser();
                Alert.danger('Wrong username or password');
            });
    }
}

/*
Connects the state and actions to the component.
The original component is not changed. Instead, connect function returns a new, connected component class that wraps the component passed in.
 */
export const LoginPopUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginAgainBox);
