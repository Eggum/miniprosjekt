// @flow

import {Component} from "react-simplified";
import * as React from "react";

export class Carousel extends Component<{ children?: React.Node }> {
    render() {
        return (
            <div
                id="carouselExampleControls"
                className="carousel slide prettyCarousel"
                data-ride="carousel"
            >
                <div className="carousel-inner">{this.props.children}</div>
                <a
                    className="carousel-control-prev"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                >
                    <span
                        className="carousel-control-prev-icon"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Previous</span>
                </a>
                <a
                    className="carousel-control-next"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                >
                    <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                    />
                    <span className="sr-only">Next</span>
                </a>
            </div>
        );
    }
}