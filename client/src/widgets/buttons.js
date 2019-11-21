// @flow

import * as React from 'react';
import { Component } from 'react-simplified';

class ButtonPrimary extends Component<{
    onClick: () => mixed,
    children?: React.Node
}> {
    render() {
        return (
            <button
                type="button"
                className="btn btn-primary"
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        );
    }
}

class ButtonDanger extends Component<{
    onClick: () => mixed,
    children?: React.Node
}> {
    render() {
        return (
            <button
                type="button"
                className="btn btn-danger"
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        );
    }
}

class ButtonDangerSmallFloatRight extends Component<{
    onClick: () => mixed,
    children?: React.Node
}> {
    render() {
        return (
            <button
                type="button"
                className="btn btn-danger btn-sm float-right"
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        );
    }
}

class ButtonRound extends Component<{
    onClick: () => mixed,
    children?: React.Node
}> {
    render() {
        return (
            <button
                type="button"
                className="buttonRound"
                onClick={this.props.onClick}
            >
                {this.props.children}
            </button>
        );
    }
}

class ButtonModalDanger extends Component<{
    dataTarget: string,
    children?: React.Node
}> {
    render() {
        return (
            <button
                type="button"
                className="btn btn-danger"
                data-toggle="modal"
                data-target={'#' + this.props.dataTarget}
            >
                {this.props.children}
            </button>
        );
    }
}

class ButtonSubmit extends Component<{ children?: React.Node }> {
    render() {
        return (
            <button className="btn btn-primary" type="submit">
                {this.props.children}
            </button>
        );
    }
}

export class Button {
    static Round = ButtonRound;
    static Danger = ButtonDanger;
    static Primary = ButtonPrimary;
    static ModalDanger = ButtonModalDanger;
    static DangerSmallRight = ButtonDangerSmallFloatRight;
    static Submit = ButtonSubmit;
}
