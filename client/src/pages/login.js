// @flow

import * as React from 'react';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import { Component } from 'react-simplified';
import { Alert } from '../widgets/alert';
import { LoginForm } from '../widgets/login';
import { User, userService } from '../services.js';
import { connect } from 'react-redux';
import { changeName, logIn, changeId } from '../redux/actions';

const history: HashHistory = createHashHistory();

/**
 * The login page. User state are stored and altered with Redux-library.
 * With successful login user is returned to the previous page.
 */

// The property types of login component.
type prop = {
    stateName: string,
    isLogged: boolean,
    changeName: string => mixed,
    loginUser: () => mixed,
    changeID: number => mixed
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
        changeID: newID => dispatch(changeId(newID))
    };
}

class LoginComp extends Component<prop> {
    user: User = new User();

    render() {
        return (
            <div className="loginBackground">
                <LoginForm login={this.login} user={this.user} />
            </div>
        );
    }

    login(event: SyntheticInputEvent<HTMLFormElement>) {
        event.preventDefault();

        userService
            .loginUser(this.user)
            .then(res => {
                if (res != null) {
                    localStorage.setItem('myToken', res.jwt);
                }
                this.props.changeName(this.user.username);
                this.props.changeID(res.id);
                this.props.loginUser();
                history.goBack();
            })
            .catch((error: Error) => {
                Alert.danger(error.message);
            });
    }
}

/*
Connects the state and actions to the component.
The original component is not changed. Instead, connect function returns a new, connected component class that wraps the component passed in.
 */
export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComp);
