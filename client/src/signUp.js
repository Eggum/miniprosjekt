// @flow

import * as React from 'react';
import {createHashHistory} from "history";
import {Component} from "react-simplified";
import {articleService} from "./services";
import {NavLink} from "react-router-dom";
import {Alert} from "./widgets";
import {Button} from "./buttons";

export class SignUp extends Component {
    render(){
        return(
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" type="text"/>
                <label htmlFor="password">Password</label>
                <input id="password" type="password"/>
                <label htmlFor="password">Repeat password</label>
                <input id="password" type="password"/>
                <Button.Primary> ok </Button.Primary>
            </div>
        )
    }
}