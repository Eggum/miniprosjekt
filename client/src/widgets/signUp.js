// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import {Button} from "./buttons";
import {NavLink} from "react-router-dom";
import {User} from "../services";

//export class SignUpForm extends Component <{register : (event: SyntheticInputEvent<HTMLFormElement>) => mixed, user : User}> {
export class SignUpForm extends Component <{register : () => mixed, user : User}> {
/*
   save(event: SyntheticInputEvent<HTMLFormElement>) {
        event.preventDefault();
 */


    onSubmit(event: SyntheticInputEvent<HTMLFormElement>){
        event.preventDefault();



        this.props.register();
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
                            if (this.props.user)
                                this.props.user.password = event.target.value;
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
                    <Button.Submit>Register</Button.Submit>
                    <NavLink to="/login"> To login </NavLink>
                </div>
            </form>
        );
    }
}
