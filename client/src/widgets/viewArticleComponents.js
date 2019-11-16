// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {createHashHistory} from "history";
import {Comment } from "../services.js";
import {Button} from "./buttons";
import {connect} from "react-redux";


const history = createHashHistory();


// maps state to component as prop!
function mapStateToProps(state) {
    return {
        stateName: state.name,
        isLogged : state.isLogged,
        stateID: state.id
    };
}

class CommentSectionComp extends Component<{comments : Array<Comment>, newComment : Comment, onClick : () => mixed, onDelete : (c : Comment) => mixed, isLogged : boolean, stateName : string, stateID : number}>{

    render(){
        return(
            <div className = "commentSection">
                <h2>Comments:</h2>
                {this.props.comments.map((c : Comment) =>
                         (
                            <div className="card bg-light mb-3" key={c.id}>
                                <div className="card-header">
                                    <h5 className="card-title">{c.username}</h5>
                                </div>
                                <div className="card-body">
                                    <p className="card-text">{c.text}</p>
                                    <small className="card-subtitle mb-2 text-muted">{c.creation_date}</small>
                                    {(this.props.isLogged && this.props.stateID === c.creator)
                                        ?
                                        <Button.DangerSmallRight onClick={() => this.props.onDelete(c)}>Delete comment</Button.DangerSmallRight>
                                        :
                                        null
                                    }
                                </div>
                            </div>
                        )
                )}
                <label htmlFor="newComment">New comment</label>
                {this.props.isLogged
                ?
                <h5>{this.props.stateName}</h5>
                :
                <h5>Anonym</h5>}
                <input required type="text" className="form-control" id="newComment" placeholder="..."
                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                           if (this.props.newComment) this.props.newComment.text = event.target.value;
                       }}/>
                <Button.Primary onClick={this.props.onClick}>Publish comment</Button.Primary>
            </div>
        )
    }
}

export const CommentSection = connect(mapStateToProps)(CommentSectionComp);