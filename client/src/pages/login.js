// @flow

import * as React from 'react';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import { Alert } from '../widgets/alert';
import { LoginForm } from '../widgets/login';
import { User, userService } from '../services.js';
import { connect } from 'react-redux';
import { changeName, logIn, changeId } from '../redux/actions';

const history: HashHistory = createHashHistory();

type prop = {
    stateName: string,
    isLogged: boolean,
    changeName: string => mixed,
    loginUser: () => mixed,
    changeID: number => mixed
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
        changeID: newID => dispatch(changeId(newID))
    };
}

class LoginComp extends Component<prop> {
    user: User = new User();

    render() {
        return (
            <div className="loginBackground">
                <LoginForm login={this.login} user={this.user}/>
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

export const Login = connect(
    mapStateToProps,
    mapDispatchToProps
)(LoginComp);
