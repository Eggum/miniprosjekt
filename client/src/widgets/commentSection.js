// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Comment } from '../services.js';
import { Button } from './buttons';
import { connect } from 'react-redux';

/**
 * Displays the comment section. Used in view article.
 * If the user is logged in, the user can delete own comments.
 * Uses bootstrap for styling.
 */

// The states that are going to be mapped to the component as properties.
function mapStateToProps(state) {
    return {
        stateName: state.name,
        isLogged: state.isLogged,
        stateID: state.id
    };
}

class CommentSectionComp extends Component<{
    comments: Array<Comment>,
    newComment: Comment,
    onClick: () => mixed,
    onDelete: (c: Comment) => mixed,
    isLogged: boolean,
    stateName: string,
    stateID: number
}> {
    render() {
        return (
            <div className="commentSection">
                <h2>Comments:</h2>
                {this.props.comments.map((c: Comment) => (
                    <div className="card bg-light mb-3" key={c.id}>
                        <div className="card-header">
                            <h5 className="card-title">{c.username}</h5>
                        </div>
                        <div className="card-body">
                            <p className="card-text">{c.text}</p>
                            <small className="card-subtitle mb-2 text-muted">
                                {new Date(c.creation_date).toLocaleString()}
                            </small>
                            {this.props.isLogged &&
                            this.props.stateID === c.creator ? (
                                <Button.DangerSmallRight
                                    onClick={() => this.props.onDelete(c)}
                                >
                                    Delete comment
                                </Button.DangerSmallRight>
                            ) : null}
                        </div>
                    </div>
                ))}
                <label htmlFor="newComment">New comment</label>
                {this.props.isLogged ? (
                    <h5>{this.props.stateName}</h5>
                ) : (
                    <h5>Anonym</h5>
                )}
                <input
                    required
                    type="text"
                    className="form-control"
                    id="newComment"
                    placeholder="..."
                    onChange={(
                        event: SyntheticInputEvent<HTMLInputElement>
                    ) => {
                        if (this.props.newComment)
                            this.props.newComment.text = event.target.value;
                    }}
                />
                <Button.Primary onClick={this.props.onClick}>
                    Publish comment
                </Button.Primary>
            </div>
        );
    }
}

/*
Connects the state to the component.
The original component is not changed. Instead, connect function returns a new, connected component class that wraps the component passed in.
 */
export const CommentSection = connect(mapStateToProps)(CommentSectionComp);
