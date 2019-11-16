// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {User, userService} from "../services";
import {NavLink} from "react-router-dom";
import {Alert} from "./widgets";
import {changeId, changeName, logIn, logOut} from "../redux/actions";
import {connect} from "react-redux";

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
        logoutUser: () => dispatch(logOut()),
        changeID: newID => dispatch(changeId(newID))
    };
}

class LoginAgainBox extends Component<{ modalId : React.Node, modalBody : React.Node, onClick : () => mixed, children?: React.Node }>{

    user : User = new User();


    render(){
        return(
            <div className="modal fade " id="loginPopUp" tabIndex="-1" role="dialog"
                 aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Please login again</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this.cancel}>
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form className="" onSubmit={this.login}>
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
                                    <button className="btn btn-primary" type="submit" >Login</button>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-dismiss="modal" onClick={this.cancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    cancel(){
        this.props.changeName("anonym");
        this.props.changeID(1);
        this.props.logoutUser();
    }

    login(event : SyntheticInputEvent<HTMLFormElement>){
        event.preventDefault();


        userService.loginUser(this.user)
            .then(res => {
                if(res != null){
                    //    console.log("resultat: " + res.jwt);
                    Alert.info("You are logged in");
                    localStorage.setItem("myToken", res.jwt);
                    this.props.changeName(this.user.username);
                    this.props.changeID(res.id);
                    this.props.loginUser();
                }
            })
            .catch((error: Error) => {
                this.props.changeName("anonym");
                this.props.changeID(1);
                this.props.logoutUser();
                Alert.danger("You are not logged in");
            });

    }
}

export const LoginPopUp = connect(mapStateToProps, mapDispatchToProps)(LoginAgainBox);

