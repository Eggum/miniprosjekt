// @flow

import axios, { AxiosRequestConfig } from 'axios';
import type { UserResponse } from './types';

/**
 * The service that communicates with the server.
 * Uses axios.
 */

/*
intercepts all axios request to add token to the headers from localStorage.
 */

axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = localStorage.getItem('myToken');
        if (token) {
            config.headers['x-access-token'] = token;
        }
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export class Article {
    id: number;
    title: string;
    text: string;
    creation_date: string;
    image: string;
    alt: string;
    category: string;
    importance: number;
    image_text: string;
    creator: number;
    username: string;
    paragraphs: string[] = [];
}

export class Category {
    category: string;
}

export class Comment {
    id: number;
    text: string;
    creation_date: string;
    creator: number;
    article: number;
    username: string;
}

export class User {
    id: number;
    username: string;
    password: string;
}

class CommentService {
    getComments(id: number) {
        return axios
            .get<Comment[]>('http://localhost:4000/article/' + id + '/comment')
            .then(response => response.data);
    }

    postComment(comment: Comment) {
        return axios
            .post<Comment, void>(
                'http://localhost:4000/article/' + comment.article + '/comment',
                comment
            )
            .then(response => response.data);
    }

    deleteComment(comment: Comment) {
        return axios
            .delete<Comment>(
                'http://localhost:4000/article/' +
                    comment.article +
                    '/comment/' +
                    comment.id
            )
            .then(response => response.data);
    }
}

class ArticleService {
    getArticles() {
        return axios
            .get<Article[]>('http://localhost:4000/article')
            .then(response => response.data);
    }

    getCategories() {
        return axios
            .get<Category[]>('http://localhost:4000/category')
            .then(response => response.data);
    }

    getArticle(id: number) {
        return axios
            .get<Article>('http://localhost:4000/article/' + id)
            .then(response => response.data);
    }

    updateArticle(article: Article) {
        return axios
            .put<Article, void>(
                'http://localhost:4000/article/' + article.id,
                article
            )
            .then(response => response.data);
    }

    deleteArticle(id: number) {
        return axios
            .delete<Article>('http://localhost:4000/article/' + id)
            .then(response => response.data);
    }

    postArticle(article: Article) {
        return axios
            .post<Article, void>('http://localhost:4000/article/', article)
            .then(response => response.data);
    }
}

class UserService {
    loginUser(user: User) {
        return axios
            .post<User, UserResponse>('http://localhost:4000/login', user)
            .then(response => response.data);
    }
    postUser(user: User) {
        return axios
            .post<User, UserResponse>('http://localhost:4000/User', user)
            .then(response => response.data);
    }
}

export let articleService = new ArticleService();
export let commentService = new CommentService();
export let userService = new UserService();

/*
Really simple token refresher.
Does probably not fit in here, should be placed somewhere else and handled differently.
In the future should also logout the user from the website if the token is outdated.
 */
window.setInterval(function() {
    axios
        .post<UserResponse>('http://localhost:4000/token')
        .then(response => {
            if (response.data.jwt !== undefined) {
                localStorage.setItem('myToken', response.data.jwt);
            }
        })
        .catch(err => console.log(err));
}, 500000);
