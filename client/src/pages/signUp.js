// @flow

import * as React from 'react';
import { createHashHistory } from 'history';
import type { HashHistory } from 'history';
import { Component } from 'react-simplified';
import { User, userService } from '../services';
import { NavLink } from 'react-router-dom';
import { Alert } from '../widgets/alert';
import { Button } from '../widgets/buttons';
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
                <form className="login">
                    <h1>Sign up</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input
                            required
                            className="form-control"
                            id="username"
                            type="text"
                            onChange={(
                                event: SyntheticInputEvent<HTMLInputElement>
                            ) => {
                                if (this.user)
                                    this.user.username = event.target.value;
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input
                            required
                            className="form-control"
                            id="password"
                            type="password"
                            onChange={(
                                event: SyntheticInputEvent<HTMLInputElement>
                            ) => {
                                if (this.user)
                                    this.user.password = event.target.value;
                            }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordRepeat">Repeat password</label>
                        <input
                            required
                            className="form-control"
                            id="passwordRepeat"
                            type="password"
                        />
                    </div>
                    <div className="form-group">
                        <Button.Primary onClick={this.register}>
                            {' '}
                            Register{' '}
                        </Button.Primary>
                        <NavLink to="/login"> Back to login </NavLink>
                    </div>
                </form>
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
