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
            <div className="loginBackground">
                <form className="login">
                    <h1>Sign up</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" id="username" type="text" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.user) this.user.username = event.target.value;
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input className="form-control" id="password" type="password" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                        if (this.user) this.user.password = event.target.value;
                        }}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor="passwordRepeat">Repeat password</label>
                        <input className="form-control" id="passwordRepeat" type="password"/>
                    </div>
                    <div className="form-group">
                        <Button.Primary onClick={this.register}> Register </Button.Primary>
                        <NavLink to="/login"> Back to login </NavLink>
                    </div>
                </form>
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
