// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Button } from './buttons';
import { NavLink } from 'react-router-dom';
import { User } from '../services';

/**
 * Login form. Styled with own css.
 */

export class LoginForm extends Component<{
    login: (event: SyntheticInputEvent<HTMLFormElement>) => mixed,
    user: User
}> {
    render() {
        return (
            <form className="login" onSubmit={this.props.login}>
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
                            if (this.props.user)
                                this.props.user.username = event.target.value;
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
                            if (this.props.user)
                                this.props.user.password = event.target.value;
                        }}
                    />
                </div>
                <div className="form-group">
                    <Button.Submit>Login</Button.Submit>
                    <NavLink to="/signUp"> Sign up </NavLink>
                </div>
            </form>
        );
    }
}
