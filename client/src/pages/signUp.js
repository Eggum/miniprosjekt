// @flow

import * as React from 'react';
import {createHashHistory} from "history";
import {Component} from "react-simplified";
import {articleService, User, userService} from "../services";
import {NavLink} from "react-router-dom";
import {Alert} from "../widgets/widgets";
import {Button} from "../widgets/buttons";

export class SignUp extends Component {
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
                <label htmlFor="passwordRepeat">Repeat password</label>
                <input id="passwordRepeat" type="password"/>
                <Button.Primary onClick={this.register}> Register </Button.Primary>
            </div>
        )
    }


    register(){
        console.log("Registerer");
        console.log(this.user.username + this.user.password);
        userService.postUser(this.user)
            .then((res) => {
                console.log("resultat: " + res.jwt);
                localStorage.setItem("myToken", res.jwt);
            })
            .catch((error: Error) => {
                Alert.danger(error.message);
            });

    }
}
