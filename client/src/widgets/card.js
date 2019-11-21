// @flow

import {Component} from "react-simplified";
import * as React from "react";
import {NavLink} from "react-router-dom";

export class Card extends Component<{
    title: React.Node,
    image: React.Node,
    id: React.Node,
    alt: React.Node
}> {
    render() {
        return (
            <div className="card card-pretty">
                <img
                    src={this.props.image}
                    className="card-img-top"
                    alt={this.props.alt}
                />
                <div className="card-body">
                    <h5 className="card-title">{this.props.title}</h5>
                    <NavLink
                        to={'/article/' + +this.props.id}
                        className="stretched-link"
                    >
                        Read more
                    </NavLink>
                </div>
            </div>
        );
    }
}