// @ flow

import React from 'react';
/*
import {sharedComponentData} from 'react-simplified';

class CurrentUser {
    id : number = -1;
    cUsername : string = "Login";
    loggedIn : boolean = false;
}

export const currentUser = sharedComponentData({
    id : -1,
    cUsername :"Login",
    loggedIn : false
});
*/

export const currentUser = React.createContext({
   id : -1,
   cUsername : "Login",
   loggedIn : false
});