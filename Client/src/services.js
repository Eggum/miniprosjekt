// @flow

import axios from 'axios';

export class Article{
    id : number;
    title : string;
    text : string;
    creation_date : Date;
    image : string;
    alt : string;
    category : string;
    importance : number;
    image_text : string;
    creator : string;
    paragraphs : string[] = [];
}

class ArticleService{
    getArticles(){
        return axios.get<Article[]>('http://localhost:8080/article').then(response => response.data);
    }

    getCategories(){
        return axios.get<String[]>('http://localhost:8080/category').then(response => response.data);
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

export let articleService = new ArticleService();