import {Component} from "react-simplified";
import * as React from "react";

export class ConfirmBox extends Component<{
    modalId: React.Node,
    modalHeader: React.Node,
    modalBody: React.Node,
    onClick: () => mixed,
    children?: React.Node
}> {
    render() {
        return (
            <div
                className="modal fade"
                id={this.props.modalId}
                tabIndex="-1"
                role="dialog"
                aria-labelledby="exampleModalLabel"
                aria-hidden="true"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">
                                {this.props.modalHeader}
                            </h5>
                            <button
                                type="button"
                                className="close"
                                data-dismiss="modal"
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">{this.props.modalBody}</div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                data-dismiss="modal"
                            >
                                No
                            </button>
                            <button
                                type="button"
                                className="btn btn-primary"
                                data-dismiss="modal"
                                onClick={this.props.onClick}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}