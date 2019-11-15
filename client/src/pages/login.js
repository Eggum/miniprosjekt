// @flow

import * as React from 'react';
import {createHashHistory} from "history";
import {Component} from "react-simplified";
import {NavLink} from "react-router-dom";
import {Alert} from "../widgets/widgets";
import {Button} from "../widgets/buttons";
import {User, userService} from "../services.js";
import {currentUser} from "../sharedState.js";

export class Login extends Component {

    user : User = new User();


    render(){
        return(
            <div className="loginBackground">
                <form className="login">
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input className="form-control" id="username" placeholder="username" type="text" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.user) this.user.username = event.target.value;
                        }}/>
                    </div>
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input class="form-control" id="password" autoComplete="current-password" type="password" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.user) this.user.password = event.target.value;
                        }}/>
                    </div>
                    <div className="form-group">
                        <Button.Primary onClick={this.login}> Login </Button.Primary>
                        <NavLink to="/signUp"> Sign up </NavLink>
                    </div>
                </form>
            </div>
        )
    }

    login(){
        console.log(this.user.username + this.user.password);
       // console.log(currentUser.username);


        userService.loginUser(this.user)
            .then(res => {
                if(res != null){
                console.log("resultat: " + res.jwt);
                localStorage.setItem("myToken", res.jwt);
                }
                currentUser.cUsername = this.user.username;
                currentUser.loggedIn = true;
                console.log("fra login " + currentUser.cUsername);
            })
            .catch((error: Error) => {
                Alert.danger(error.message);
            });
    }
}