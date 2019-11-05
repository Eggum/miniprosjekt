// @ flow

import Sequelize from 'sequelize';
import type { Model } from 'sequelize';

let sequelize = new Sequelize('randeggu', 'randeggu', 'luOQ0NQQ', {
   host: 'mysql-ait.stud.idi.ntnu.no',
   dialect: 'mysql'
});

export type Article = {
    id : number;
    title : string;
    text : string;
    image : string;
    alt : string;
   // category : string;
    importance : number;
    image_text : string;
   // creator : string;
};

export type User = {
    username : string;
    password : string;
};

export type Comment = {
    id : number;
  //  articleID : number;
  //  userID : string;
};

export type Category  = {
    category : string;
};


export let ArticlesModel: Class<Model<Article>> = sequelize.define('Articlee', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
    title: Sequelize.STRING,
    text: Sequelize.STRING,
    image: Sequelize.STRING,
    alt: Sequelize.STRING,
    importance: Sequelize.INTEGER,
    image_text: Sequelize.STRING
});

export let UsersModel: Class<Model<User>> = sequelize.define('User', {
    username: { type: Sequelize.STRING, primaryKey: true},
    password: Sequelize.STRING
});

export let CommentsModel: Class<Model<Comment>> = sequelize.define('Comment', {
    id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
});

export let CategorysModel: Class<Model<Category>> = sequelize.define('Categoryy', {
    id: { type: Sequelize.STRING, primaryKey: true}
});

// Drop tables and create test data when not in production environment
let production = process.env.NODE_ENV === 'production';
// The sync promise can be used to wait for the database to be ready (for instance in your tests)
export let syncModels = sequelize.sync({ force: production ? false : true }).then(() => {
    // Create test data when not in production environment
    if (!production)
        return UsersModel.create({
            username: 'Ola',
            password: 'Jensen'
        }).then(() =>
            UsersModel.create({
                username: 'Kari',
                password: 'Larsen'
            })
        );
});
