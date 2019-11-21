// @flow

import {Component} from "react-simplified";
import {Article, articleService, Category} from "../services";
import {Button} from "./buttons";
import * as React from "react";
import {Alert} from "./alert";

export class Form extends Component<{
    article: Article,
    dataTarget: string,
    onSubmit: (event: SyntheticInputEvent<HTMLFormElement>) => mixed
}> {
    categories: Category[] = [];

    mounted() {
        articleService
            .getCategories()
            .then(categories => {
                this.categories = categories;
            })
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <form onSubmit={this.props.onSubmit} className="needs-validation">
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="title"
                        maxLength="30"
                        value={this.props.article.title}
                        placeholder="Write your title here"
                        onChange={(
                            event: SyntheticInputEvent<HTMLInputElement>
                        ) => {
                            if (this.props.article)
                                this.props.article.title = event.target.value;
                        }}
                    />
                    <div className="invalid-feedback">
                        Please provide a valid zip.
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="image">Article image</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="image"
                        value={this.props.article.image}
                        placeholder="Write image url"
                        onChange={(
                            event: SyntheticInputEvent<HTMLInputElement>
                        ) => {
                            if (this.props.article)
                                this.props.article.image = event.target.value;
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="imageText">Image text</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        maxLength="50"
                        id="imageText"
                        value={this.props.article.image_text}
                        placeholder="Write image text"
                        onChange={(
                            event: SyntheticInputEvent<HTMLInputElement>
                        ) => {
                            if (this.props.article)
                                this.props.article.image_text =
                                    event.target.value;
                        }}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="alt">Image alt</label>
                    <input
                        required
                        type="text"
                        className="form-control"
                        id="alt"
                        maxLength="50"
                        value={this.props.article.alt}
                        placeholder="image alt"
                        onChange={(
                            event: SyntheticInputEvent<HTMLInputElement>
                        ) => {
                            if (this.props.article)
                                this.props.article.alt = event.target.value;
                        }}
                    />
                </div>
                <div className="form-group form-check">
                    <input
                        type="checkbox"
                        className="form-check-input"
                        id="importance"
                        onChange={(
                            event: SyntheticInputEvent<HTMLInputElement>
                        ) => {
                            if (this.props.article)
                                if (event.target.checked) {
                                    this.props.article.importance = 1;
                                } else {
                                    this.props.article.importance = 2;
                                }
                        }}
                    />
                    <label className="form-check-label" htmlFor="importance">
                        Check this if article is IMPORTANT
                    </label>
                </div>

                <label className="radio-inline">Category</label>

                <div className="from-group">
                    {this.categories.map((c, index) =>
                        this.props.article.category === c.category ? (
                            <div
                                className="form-check form-check-inline"
                                key={index}
                            >
                                <input
                                    checked
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id={'radioButtonCategory' + index}
                                    value={c.category}
                                    onChange={(
                                        event: SyntheticInputEvent<HTMLInputElement>
                                    ) => {
                                        if (this.props.article)
                                            this.props.article.category =
                                                event.target.value;
                                    }}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={'radioButtonCategory' + index}
                                >
                                    {c.category}
                                </label>
                            </div>
                        ) : (
                            <div
                                className="form-check form-check-inline"
                                key={index}
                            >
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name="inlineRadioOptions"
                                    id={'radioButtonCategory' + index}
                                    value={c.category}
                                    onChange={(
                                        event: SyntheticInputEvent<HTMLInputElement>
                                    ) => {
                                        if (this.props.article)
                                            this.props.article.category =
                                                event.target.value;
                                    }}
                                />
                                <label
                                    className="form-check-label"
                                    htmlFor={'radioButtonCategory' + index}
                                >
                                    {c.category}
                                </label>
                            </div>
                        )
                    )}
                </div>
                <div className="form-group"></div>
                <div className="form-group">
                    <label htmlFor="articleText">Text</label>
                    <textarea
                        required
                        className="form-control"
                        rows="20"
                        value={this.props.article.text}
                        placeholder="Article text here"
                        id="articleText"
                        onChange={(
                            event: SyntheticInputEvent<HTMLInputElement>
                        ) => {
                            if (this.props.article)
                                this.props.article.text = event.target.value;
                        }}
                    />
                </div>
                <Button.ModalDanger dataTarget={this.props.dataTarget}>
                    Cancel
                </Button.ModalDanger>
                <button className="btn btn-primary" type="submit">
                    Save
                </button>
            </form>
        );
    }
}