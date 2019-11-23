// @flow

const http = require('http');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const express = require('express');
const mysql = require('mysql');
const app = express();
const ArticleDao = require('./dao/articledao.js');
const CommentDao = require('./dao/commentdao.js');
const UserDao = require('./dao/userdao.js');
const CategoryDao = require('./dao/categorydao.js');

// Not very secure.
let publicKey;
let privateKey = (publicKey = 'shhhhhverysecret');

// Not very secure, database password should not be uploaded to git.
const pool: mysql.Pool = mysql.createPool({
    connectionLimit: 2,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'randeggu',
    password: 'luOQ0NQQ',
    database: 'randeggu',
    debug: false
});

let articledao = new ArticleDao(pool);
let commentdao = new CommentDao(pool);
let userdao = new UserDao(pool);
let categorydao = new CategoryDao(pool);

/**------------------------------------------INFO------------------------------------------------*/

/**
 * The server!
 *
 *
 * The code is sectioned off into parts:
 *
 * <> app.use under USE SETUP
 * <> Authenticate
 * <> Article endpoints.
 * <> Category endpoints.
 * <> Comments endpoints.
 * <> User related endpoints.
 * <> app.listen(4000);
 *
 */

/**------------------------------------------USE SETUP------------------------------------------------*/

/*
Code that I had to add to avoid Cross-Origin Resource Sharing (CORS) problems and access denied problems.
 */
app.use((req: express$Request, res: express$Response, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, x-access-token'
    );

    next();
});
app.use(bodyParser.json());

/**------------------------------------------AUTHENTICATE------------------------------------------------*/

/*
Middleware function that authenticate the user.
Gets the token from the request header and checks if its valid.
If the token is not valid the server gets an error status of 401.
 */
const authenticate: express$Middleware<express$Request> = (
    req: express$Request,
    res: express$Response,
    next: express$NextFunction
) => {
    let token = req.headers['x-access-token'];

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log('Token NOT ok');
            res.status(401);
            res.json({ error: 'Not authorized' });
        } else {
            console.log('Token ok: ' + decoded.username);
            res.status(200);
            next();
        }
    });
};

/**------------------------------------------ARTICLE ENDPOINTS------------------------------------------------*/

// Fetches all articles from db and returns result to client.
app.get('/article', (req: express$Request, res: express$Response) => {
    console.log('/article: request get all articles from client');
    articledao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

// Fetches one article from db based upon ID.
app.get(
    '/article/:articleID',
    (req: express$Request, res: express$Response) => {
        console.log('/article/:articleID: got get request from client');
        articledao.getOne(+req.params.articleID, (status, data) => {
            res.status(status);
            console.log(data[0]);
            res.json(data[0]);
        });
    }
);

// Deletes one article from db based upon ID. User needs to be validated to succeed.
app.delete(
    '/article/:articleID',
    authenticate,
    (req: express$Request, res: express$Response) => {
        console.log('/article/:articleID: got delete request from client');
        articledao.deleteOne(+req.params.articleID, (status, data) => {
            res.status(status);
            res.json(data);
        });
    }
);

// Posts one article in the db. User needs to be validated to succeed.
app.post(
    '/article',
    authenticate,
    (
        req: {
            body: {
                title: string,
                text: string,
                image: string,
                alt: string,
                category: string,
                importance: number,
                image_text: string,
                creator: number
            }
        },
        res: express$Response
    ) => {
        console.log('/article: got post request from client');
        articledao.createOne(req.body, (status, data) => {
            res.status(status);
            res.json(data.insertId);
        });
    }
);

// Updates one article in the db based upon ID. User needs to be validated to succeed.
app.put(
    '/article/:articleID',
    authenticate,
    (
        req: {
            body: {
                title: string,
                text: string,
                image: string,
                alt: string,
                category: string,
                importance: number,
                image_text: string,
                creator: number,
                id: number
            }
        },
        res: express$Response
    ) => {
        console.log('/article/:articleID got put request from client');
        articledao.updateOne(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    }
);

/**------------------------------------------CATEGORY ENDPOINTS------------------------------------------------*/

// Fetches all categories from the db.
app.get('/category', (req: express$Request, res: express$Response) => {
    console.log('/category got get request from client');
    categorydao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

/**------------------------------------------COMMENTS ENDPOINTS------------------------------------------------*/

// Fetches all comments belonging to the article based upon article ID.
app.get(
    '/article/:articleID/comment',
    (req: express$Request, res: express$Response) => {
        console.log(
            '/article/:articleID/comments got get request from client.'
        );
        commentdao.getAllFromArticle(+req.params.articleID, (status, data) => {
            res.status(status);
            res.json(data);
        });
    }
);

// Posts comment to article based upon article ID.
app.post(
    '/article/:articleID/comment',
    (
        req: { body: { text: string, creator: number, article: number } },
        res: express$Response
    ) => {
        console.log(
            '/article/:articleID/comment got post request from client.'
        );
        commentdao.createOne(req.body, (status, data) => {
            res.status(status);
            res.json(data);
        });
    }
);

// Deletes one comment based upon commentID. User needs to be validated to succeed.
app.delete(
    '/article/:articleID/comment/:commentID',
    authenticate,
    (req: express$Request, res: express$Response) => {
        console.log(
            '/article/:articleID/comment/:commentID got delete request from client.'
        );
        commentdao.deleteOne(+req.params.commentID, (status, data) => {
            res.status(status);
            res.json(data);
        });
    }
);

/**------------------------------------------USER RELATED ENDPOINTS------------------------------------------------*/

// Posts a new user to the db. If success client receives a JWT token used to validate user later and the user ID.
app.post(
    '/user',
    (
        req: { body: { username: string, password: string } },
        res: express$Response
    ) => {
        console.log('/user: got post request from client');
        userdao.createOne(req.body, (status, data) => {
            userdao.getUserId(req.body.username, (status, data) => {
                let token = jwt.sign(
                    { username: req.body.username },
                    privateKey,
                    {
                        expiresIn: 600
                    }
                );
                res.status(status);
                res.json({ id: data[0].id, jwt: token });
            });
        });
    }
);

// Login user. If validated, client receives a JWT token used to validate user later and the user ID.
app.post(
    '/login',
    (
        req: { body: { username: string, password: string } },
        res: express$Response
    ) => {
        console.log(req.body.username, req.body.password);

        userdao.validateOne(req.body, (status, data) => {
            if (data[0][0].validationResult === 1) {
                console.log('Username and password ok');
                let token = jwt.sign(
                    { username: req.body.username },
                    privateKey,
                    {
                        expiresIn: 600
                    }
                );
                userdao.getUserId(req.body.username, (status, data) => {
                    console.log(data);
                    res.status(status);
                    res.json({ id: data[0].id, jwt: token });
                });
            } else {
                console.log('Username and password not ok');
                res.status(401);
                res.json({ error: 'Not authorized' });
            }
        });
    }
);

// Refresh token. If validated, client receives a new JWT token used to validate user later.
app.post(
    '/token',
    (
        req: {
            headers: { 'x-access-token': string }
        },
        res: express$Response
    ) => {
        let token = req.headers['x-access-token'];

        jwt.verify(token, publicKey, (err, decoded) => {
            if (err) {
                console.log('Token not ok');
                res.status(401);
                res.json({ error: 'Not authorized' });
            } else {
                console.log('Token ok: ' + decoded.username);
                let token = jwt.sign(
                    { username: decoded.username },
                    privateKey,
                    {
                        expiresIn: 600
                    }
                );
                res.json({ jwt: token });
            }
        });
    }
);

/**------------------------------------------APP.LISTEN------------------------------------------------*/

let server = app.listen(4000);
