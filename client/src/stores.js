// @flow
import { sharedComponentData } from 'react-simplified';
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
}

class ArticleStore{
    articles : Article[] = [];
    currentArticle: Article = new Article();

    getArticles(){
        return axios.get<Article[]>('http://localhost:8080/article').then(response => this.articles = response.data);
    }


    getArticle(id: number){
        return axios.get<Article>('http://localhost:8080/article/' + id).then(response => {
            this.currentArticle = response.data;

            let article = this.articles.find(article => article.id == this.currentArticle.id);
            if(article) Object.assign(article, {...this.currentArticle} );
        });
    }

}

export let articleStore = sharedComponentData(new ArticleStore())