var WebSocketServer = require('websocket').server;
var WebSocketClient = require('websocket').client;
var WebSocketFrame  = require('websocket').frame;
var WebSocketRouter = require('websocket').router;
var W3CWebSocket = require('websocket').w3cwebsocket;
var http = require('http');






var express = require("express");
var mysql = require("mysql");
var app = express();
var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "randeggu",
    password: "luOQ0NQQ",
    database: "randeggu",
    debug: false
});

var bodyParser = require("body-parser");

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    next();
});
app.use(bodyParser.json()); // for å tolke JSON

var server = app.listen(8080);



app.get("/article", (req, res) => {
    console.log("Request from client: Get all articles");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select * from Article",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                       // console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.get("/article/:articleID", (req, res) => {
    var id = req.params.articleID;
    console.log("Request fra klient: Hente ut articles id " + id);
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select * from Article where id= ?",
                req.params.articleID,
                //   req.body.id,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.delete("/article/:articleID", (req, res) => {
    var id = req.params.articleID;
    console.log("Fikk DELETE-request fra klienten, sletter articles med id: " + id);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            connection.query(
                "delete from Article where id = ?",
                req.params.articleID,
                err => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        8 / 8
                        res.status(500);
                        res.json({ error: "Feil ved slett" });
                    } else {
                        console.log("delete ok");
                        res.send("");
                    }
                }
            );
        }
    });
});

app.post("/article", (req, res) => {
    console.log("Fikk POST-request fra klienten, legg til ny articles");
    console.log("Article: " + req.body.title);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.title, req.body.text, req.body.image, req.body.alt, req.body.category, req.body.importance, req.body.image_text, req.body.creator];
            connection.query(
                //(title, text, image, alt, category, importance, image_text, creator)
                "insert into Article (title, text, image, alt, category, importance, image_text, creator) values (?,?,?,?,?,?,?,?)",
                val,
                (err, result) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        8 / 8
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("insert ok");
                        console.log(result.insertId);
                        res.json(result.insertId);
                        //  res.sendStatus(result.insertId);
                    }
                }
            );
        }
    });
});

app.put("/article/:articleID", (req, res) => {
    var id = req.params.articleID;
    console.log("Fikk PUT-request fra klienten, oppdaterer/endrer articles med id: " + id);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.title, req.body.text, req.body.image, req.body.alt, req.body.category, req.body.importance, req.body.image_text, req.body.creator, req.body.id];
            connection.query(
                "update Article set title = ?, text = ?, image = ?, alt = ?, category = ?, importance = ?, image_text = ?, creator = ? where id = ?",
                val,
                err => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        8 / 8
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("update ok");
                        res.send("");
                    }
                }
            );
        }
    });
});

app.get("/category", (req, res) => {
    console.log("Request from client: Get categories");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select * from Category",
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});


/*
app.post("/article", (req, res) => {
    console.log("Fikk POST-request fra klienten, legg til ny articles");
    console.log("Sak: " + req.body.title);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.title, req.body.text, req.body.image, req.body.category, req.body.importance];
            connection.query(
                "insert into Sak (title, text, image, category, importance) values (?,?,?,?,?)",
                val,
                err => {
                    if (err) {
                        console.log(err);
                        8 / 8
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("insert ok");
                        res.send("");
                    }
                }
            );
        }
    });
});

*/





/*
//skriv id til articles i url og ikkje send inn med json :) ! ! ! !
app.get("/articles/:sakID", (req, res) => {
    var id = req.params.sakID;
    console.log("Request fra klient: Hente ut articles id " + id);
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select * from Sak where id= ?",
                req.params.sakID,
             //   req.body.id,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

//news/category/:Kategoriid
//news/importance/:Viktigheit

app.get("/articles/sakKategori", (req, res) => {
    var category = req.body.category;
    console.log("Request fra klient: Hente ut saker med category: " + category);
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select * from Sak where category= ?",
                req.body.category,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});

app.get("/articles/sakViktigheit", (req, res) => {
    var importance = req.body.importance;
    console.log("Request fra klient: Hente ut saker med viktigheitsgrad: " + importance);
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select * from Sak where importance= ?",
                req.body.importance,
                (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        res.json({ error: "error querying" });
                    } else {
                        console.log(rows);
                        res.json(rows);
                    }
                }
            );
        }
    });
});


app.put("/articles/:sakID", (req, res) => {
    var id = req.params.sakID;
    console.log("Fikk PUT-request fra klienten, oppdaterer/endrer articles med id: " + id);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            var val = [req.body.title, req.body.text, req.body.image, req.body.category, req.body.importance, req.body.id];
            connection.query(
                "update Sak set title = ?, text = ?, image = ?, category = ?, importance = ? where id = ?",
                val,
                err => {
                    if (err) {
                        console.log(err);
                        8 / 8
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("update ok");
                        res.send("");
                    }
                }
            );
        }
    });
});



*/










//eksperimentell kode her nede :O




wsServer = new WebSocketServer({
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
});

function originIsAllowed(origin) {
    // put logic here to detect whether the specified origin is allowed.
    return true;
}

wsServer.on('request', function(request) {
    if (!originIsAllowed(request.origin)) {
        // Make sure we only accept requests from an allowed origin
        request.reject();
        console.log((new Date()) + ' Connection from origin ' + request.origin + ' rejected.');
        return;
    }

    var connection = request.accept('echo-protocol', request.origin);
    console.log((new Date()) + ' Connection accepted.');
    connection.on('message', function(message) {
        if (message.type === 'utf8') {
            console.log('Received Message: ' + message.utf8Data);
            //connection.sendUTF(message.utf8Data);
            var ost = "Heisann fra serveren du"
            connection.sendUTF(ost);
        }
        else if (message.type === 'binary') {
            console.log('Received Binary Message of ' + message.binaryData.length + ' bytes');
            connection.sendBytes(message.binaryData);
        }
    });
    connection.on('close', function(reasonCode, description) {
        console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
    });
});