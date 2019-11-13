// @flow

import axios from 'axios';

export class Article{
    id : number;
    title : string;
    text : string;
    creation_date : string;
    image : string;
    alt : string;
    category : string;
    importance : number;
    image_text : string;
    creator : number;
    paragraphs : string[] = [];
}

export class Category{
    category : string;
}

export class Comment{
    id : number;
    text : string;
    creation_date : string;
    creator : number;
    article : number;
    username : string;
}

export class User{
    id : number;
    username : string;
    password : string;
}

class CommentService{
    getComments(id: number){
        return axios.get<Comment[]>('http://localhost:8080/article/' + id + '/comment').then(response => response.data);
    }

    postComment(comment : Comment){
        return axios.post<Comment, void>('http://localhost:8080/article/' + comment.article + '/comment', comment).then(response => response.data);
    }

    deleteComment(comment: Comment){
        return axios.delete<Comment>('http://localhost:8080/article/' + comment.article + '/comment/' + comment.id).then(response => response.data);
    }

}

class ArticleService{
    getArticles(){
        return axios.get<Article[]>('http://localhost:8080/article').then(response => response.data);
    }

    getCategories(){
        return axios.get<Category[]>('http://localhost:8080/category').then(response => response.data);
    }

    getArticle(id: number){
        return axios.get<Article>('http://localhost:8080/article/' + id).then(response => response.data);
    }

    updateArticle(article: Article){
        return axios.put<Article, void>('http://localhost:8080/article/' + article.id, article).then(response => response.data);
    }

    deleteArticle(id: number){
        return axios.delete<Article>('http://localhost:8080/article/' + id).then(response => response.data);
    }

    postArticle(article : Article){
        return axios.post<Article, void>('http://localhost:8080/article/', article).then(response => response.data);
    }
}

class UserService{
    loginUser(user : User){
        return axios.post<User, void>('http://localhost:8080/login', user).then(response => response.data);
    }
    postUser(user : User){
        return axios.post<User, void>('http://localhost:8080/User', user).then(response => response.data);
    }
}

export let articleService = new ArticleService();
export let commentService = new CommentService();
export let userService = new UserService;