// @flow

import * as React from 'react';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import { Component } from 'react-simplified';
import { User, userService } from '../services';
import { Alert } from '../widgets/alert';
import { SignUpForm } from '../widgets/signUp';
import { changeId, changeName, logIn } from '../redux/actions';
import { connect } from 'react-redux';
const history: HashHistory = createHashHistory();

/**
 * The sign up page. User state are stored and altered with Redux-library.
 * With sign up success user is returned to the previous page.
 */

// The property types of sign up component.
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

class SignUpComp extends Component<prop> {
    user: User = new User();

    render() {
        return (
            <div className="loginBackground">
                <SignUpForm register={this.register} user={this.user} />
            </div>
        );
    }

    register() {
        userService
            .postUser(this.user)
            .then(res => {
                localStorage.setItem('myToken', res.jwt);
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
export const SignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpComp);
