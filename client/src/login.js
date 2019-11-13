// @flow

import * as React from 'react';
import {createHashHistory} from "history";
import {Component} from "react-simplified";
import {NavLink} from "react-router-dom";
import {Alert} from "./widgets";
import {Button} from "./buttons";
import {User, userService} from "./services.js";

export class Login extends Component {

    user : User = new User();


    render(){
        return(
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    if (this.user) this.user.username = event.target.value;
                }}/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                    if (this.user) this.user.password = event.target.value;
                }}/>
                <Button.Primary onClick={this.login}> Login </Button.Primary>
                <NavLink to="/signUp"> Sign up </NavLink>
            </div>
        )
    }

    login(){
        console.log(this.user.username + this.user.password);
        userService.loginUser(this.user)
            .then(res => {
                console.log("resultat: " + res.jwt);
                localStorage.setItem("myToken", res.jwt);
            })
    }
}