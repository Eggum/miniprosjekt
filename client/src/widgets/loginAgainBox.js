// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { User, userService } from '../services';
import { Alert } from './widgets';
import { changeId, changeName, logIn, logOut } from '../redux/actions';
import { connect } from 'react-redux';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
declare var jQuery: any;
const history: HashHistory = createHashHistory();

type props = {
    stateName: string,
    isLogged: boolean,
    changeName: string => mixed,
    loginUser: () => mixed,
    logoutUser: () => mixed,
    changeID: number => mixed,
    ifCancel: () => mixed
};

// maps state to component as props.
function mapStateToProps(state) {
    return {
        stateName: state.name,
        isLogged: state.isLogged,
        stateID: state.id
    };
}

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

        // ifCancel if a function sent in in case the program needs extra handling when closing the loginAgainBox.
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
                this.props.changeName('anonym');
                this.props.changeID(1);
                this.props.logoutUser();
                Alert.danger('Wrong username or password');
            });
    }
}

export const LoginPopUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginAgainBox);
