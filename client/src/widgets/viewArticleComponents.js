// @flow

import * as React from 'react';
import {Component} from "react-simplified";
import { HashRouter, Route, NavLink } from 'react-router-dom';
import {createHashHistory} from "history";
import {Comment } from "../services.js";
import {Button} from "./buttons";


const history = createHashHistory();



export class CommentSection extends Component<{comments : Array<Comment>, newComment : Comment, onClick : () => mixed, onDelete : (c : Comment) => mixed}>{

    render(){
        return(
            <div className = "commentSection">
                <h2>Comments:</h2>
                {this.props.comments.map((c : Comment) =>
                         (
                            <div className="card" key={c.id}>
                                <div className="card-body">
                                    <h5 className="card-title">{c.username}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{c.creation_date}</h6>
                                    <p className="card-text">{c.text}</p>
                                    <Button.Danger onClick={() => this.props.onDelete(c)}>Delete comment</Button.Danger>
                                </div>
                            </div>
                        )
                )}
                <label htmlFor="newComment">New comment</label>
                <input required type="text" className="form-control" id="newComment" placeholder="..."
                       onChange={(event: SyntheticInputEvent<HTMLInputElement>) => {
                           if (this.props.newComment) this.props.newComment.text = event.target.value;
                       }}/>
                <Button.Primary onClick={this.props.onClick}>Publish comment</Button.Primary>
            </div>
        )
    }
}
//onClick={this.props.onDelete(c)}
//() => this.handleClick(id)