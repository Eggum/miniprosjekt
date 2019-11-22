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

export const SignUp = connect(
    mapStateToProps,
    mapDispatchToProps
)(SignUpComp);
