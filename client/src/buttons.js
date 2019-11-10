// @flow

import * as React from 'react';
import {Component} from "react-simplified";

class ButtonPrimary extends Component<{ onClick : () => mixed, children?: React.Node }> {
    render(){
        return (
            <button type="button" className="btn btn-primary" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}

class ButtonDanger extends Component<{ onClick : () => mixed, children?: React.Node }> {
    render(){
        return (
            <button type="button" className="btn btn-danger" onClick={this.props.onClick}>
                {this.props.children}
            </button>
        )
    }
}

class ButtonModalDanger extends Component<{ dataTarget: string, children?: React.Node }>{
    render(){
        return (
            <button type="button" className="btn btn-danger" data-toggle="modal" data-target={"#" + this.props.dataTarget}>
                {this.props.children}
            </button>
        )
    }
}

export class Button{
    static Danger = ButtonDanger;
    static Primary = ButtonPrimary;
    static ModalDanger = ButtonModalDanger;
}