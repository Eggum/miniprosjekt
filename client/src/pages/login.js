// @flow

import * as React from 'react';
import {createHashHistory} from "history";
import {Component} from "react-simplified";
import {NavLink} from "react-router-dom";
import {Alert} from "../widgets/widgets";
import {Button} from "../widgets/buttons";
import {User, userService} from "../services.js";
import {connect} from "react-redux";
import {changeName, logIn, changeId} from "../redux/actions";


const history = createHashHistory();

type prop = {
    stateName : string,
    isLogged : boolean,
    changeName : (string) => mixed,
    loginUser: () => mixed,
    changeID: (number) => mixed
}

// maps state to component as props.
function mapStateToProps(state) {
    return {
        stateName: state.name,
        isLogged: state.isLogged,
        stateID: state.id
    };
}

function mapDispatchToProps(dispatch){
    return{
        changeName: newName => dispatch(changeName(newName)),
        loginUser: () => dispatch(logIn()),
        changeID: newID => dispatch(changeId(newID))
    };
}


class LoginComp extends Component<prop> {

    user : User = new User();


    render(){
        return(
            <div className="loginBackground">
                <form className="login" onSubmit={this.login}>
                    <h1>Login</h1>
                    <div className="form-group">
                        <label htmlFor="username">Username</label>
                        <input required className="form-control" id="username" placeholder="username" type="text" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.user) this.user.username = event.target.value;
                        }}/>
                    </div>
                        <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input required className="form-control" id="password" autoComplete="current-password" type="password" onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                            if (this.user) this.user.password = event.target.value;
                        }}/>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary" type="submit">Login</button>
                        <NavLink to="/signUp"> Sign up </NavLink>
                    </div>
                </form>
            </div>
        )
    }
    /*
    event : SyntheticInputEvent<HTMLFormElement>){
        event.preventDefault();
     */

    login(event : SyntheticInputEvent<HTMLFormElement>){
        event.preventDefault();


        userService.loginUser(this.user)
            .then(res => {
                if(res != null){
            //    console.log("resultat: " + res.jwt);
                localStorage.setItem("myToken", res.jwt);
                }
            //    console.log("HEI DETTE ER ID? " + res.id);
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





export const Login = connect(mapStateToProps, mapDispatchToProps)(LoginComp);
