// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import {LoadingSpinner} from "../widgets/loadingSpinner";

export class Spinner extends Component {
    render(){
        return(
            <LoadingSpinner/>
        )
    }
}