// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Button } from './buttons';
import { NavLink } from 'react-router-dom';
import { User } from '../services';

/**
 * The sign up page. User state are stored and altered with Redux-library.
 * With successful sign up user is logged in and returned to the previous page.
 * The password must be repeated and matching to sign up successfully.
 */

export class SignUpForm extends Component<{
    register: () => mixed,
    user: User
}> {
    password: string = '';
    passwordRetyped: string = '';
    passwordRetypedTarget: ?HTMLInputElement = null;

    onSubmit(event: SyntheticInputEvent<HTMLFormElement>) {
        event.preventDefault();

        if (this.password === this.passwordRetyped) {
            this.props.register();
        } else {
            if (this.passwordRetypedTarget) {
                this.passwordRetypedTarget.setCustomValidity(
                    'Passwords must match'
                );
            }
        }
    }

    render() {
        return (
            <form className="login" onSubmit={this.onSubmit}>
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
                        type="password"
                        onChange={(
                            event: SyntheticInputEvent<HTMLInputElement>
                        ) => {
                            if (this.props.user) {
                                this.props.user.password = event.target.value;
                                this.password = event.target.value;
                            }
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
                        onChange={(
                            event: SyntheticInputEvent<HTMLInputElement>
                        ) => {
                            if (this.props.user) {
                                this.passwordRetyped = event.target.value;
                                this.passwordRetypedTarget = event.target;
                                this.passwordRetypedTarget.setCustomValidity(
                                    ''
                                );
                            }
                        }}
                    />
                </div>
                <div className="form-group">
                    <Button.Submit>Register</Button.Submit>
                    <NavLink to="/login"> To login </NavLink>
                </div>
            </form>
        );
    }
}
