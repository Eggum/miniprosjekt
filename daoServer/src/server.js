var http = require('http');
var bodyParser = require("body-parser");
var jwt = require("jsonwebtoken");



var express = require("express");
var mysql = require("mysql");
var app = express();
const ArticleDao = require("./dao/articledao.js");
const CommentDao = require("./dao/commentdao.js");
const UserDao = require("./dao/userdao.js");
const CategoryDao = require("./dao/categorydao.js");


var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "randeggu",
    password: "luOQ0NQQ",
    database: "randeggu",
    debug: false
});

let articledao = new ArticleDao(pool);
let commentdao = new CommentDao(pool);
let userdao = new UserDao(pool);
let categorydao = new CategoryDao(pool);








app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});
app.use(bodyParser.json());






app.get("/article", (req, res) => {
    console.log("/article: request get all articles from client");
    articledao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.get("/article/:articleID", (req, res) => {
    console.log("/article/:articleID: got get request from client");
    articledao.getOne(req.params.articleID, (status, data) => {
        res.status(status);
        res.json(data[0]);
    })
});

app.delete("/article/:articleID", (req, res) => {
    console.log("/article/:articleID: got delete request from client");
    articledao.deleteOne(req.params.articleID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});

app.post("/article", (req, res) => {
    console.log("/article: got post request from client");
    articledao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data.insertId);
    })
});

app.put("/article/:articleID", (req, res) => {
   console.log("/article/:articleID got put request from client");
   articledao.updateOne(req.body, (status, data) => {
       res.status(status);
       res.json(data);
   })
});

app.get("/category", (req, res) => {
    console.log("/category got get request from client");
    categorydao.getAll((status, data) => {
        res.status(status);
        res.json(data);
    })
});


app.get("/article/:articleID/comment", (req, res) => {
   console.log("/article/:articleID/comments got get request from client.");
   commentdao.getAllFromArticle(req.params.articleID, (status, data) => {
       res.status(status);
       res.json(data);
    })
});

app.post("/article/:articleID/comment", (req, res) => {
   console.log("/article/:articleID/comment got post request from client.");
   commentdao.createOne(req.body, (status, data) => {
       res.status(status);
       res.json(data);
   })
});

app.post("/user", (req, res) => {
    console.log("/user: got post request from client");
    userdao.createOne(req.body, (status, data) => {
        res.status(status);
        res.json(data.insertId);
    })
});

app.delete("/article/:articleID/comment/:commentID", (req, res) => {
    console.log("/article/:articleID/comment/:commentID got delete request from client.");
    commentdao.deleteOne(req.params.commentID, (status, data) => {
        res.status(status);
        res.json(data);
    })
});


var server = app.listen(8080);








// Burde vært ekte sertifikat, lest fra config...
let privateKey = (publicKey = "shhhhhverysecret");


app.post("/token", (req, res) => {
    let token = req.headers["x-access-token"];

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token not ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            console.log("Token ok: " + decoded.username);
            let token = jwt.sign({ username: req.body.username }, privateKey, {
                expiresIn: 30
            });
            res.json({ jwt: token });
        }
    });
});

app.post("/login", (req, res) => {
    console.log(req.body.username, req.body.password);

    userdao.validateOne(req.body, (status, data) => {

        if(data[0][0].validationResult === 1){
            console.log("Username & password ok");
            let token = jwt.sign({ username: req.body.username }, privateKey, {
                expiresIn: 30
            });
            res.json({ jwt: token });
        } else {
            console.log("Username & password not ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        }
    })
});


app.use("/api", (req, res, next) => {
    var token = req.headers["x-access-token"];

    jwt.verify(token, publicKey, (err, decoded) => {
        if (err) {
            console.log("Token IKKE ok");
            res.status(401);
            res.json({ error: "Not authorized" });
        } else {
            console.log("Token ok: " + decoded.brukernavn);
            next();
        }
    });
});
