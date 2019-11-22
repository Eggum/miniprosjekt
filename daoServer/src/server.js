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

// Burde vært ekte sertifikat, lest fra config.
let publicKey;
let privateKey = (publicKey = 'shhhhhverysecret');

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

const authenticate: express$Middleware<express$Request> = (
    req: express$Request,
    res: express$Response,
    next: express$NextFunction
) => {
    let token = req.headers['x-access-token'];

    console.log('token motatt ' + token);

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log('Token IKKE ok');
            res.status(401);
            res.json({ error: 'Not authorized' });
        } else {
            console.log('Token ok: ' + decoded.username);
            res.status(200);
            next();
        }
    });
};

app.get('/article', (req: express$Request, res: express$Response) => {
    console.log('/article: request get all articles from client');
    articledao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

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

app.get('/category', (req: express$Request, res: express$Response) => {
    console.log('/category got get request from client');
    categorydao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    });
});

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

var server = app.listen(4000);

app.post(
    '/token',
    (
        req: {
            body: { username: string },
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
                    { username: req.body.username },
                    privateKey,
                    {
                        expiresIn: 30
                    }
                );
                res.json({ jwt: token });
            }
        });
    }
);

app.post(
    '/login',
    (
        req: { body: { username: string, password: string } },
        res: express$Response
    ) => {
        console.log(req.body.username, req.body.password);

        userdao.validateOne(req.body, (status, data) => {
            if (data[0][0].validationResult === 1) {
                console.log('Username & password ok');
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
                console.log('Username & password not ok');
                res.status(401);
                res.json({ error: 'Not authorized' });
            }
        });
    }
);
