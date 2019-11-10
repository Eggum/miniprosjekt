console.log("few blir kjørt");


var WebSocketServer = require('websocket').server;
var WebSocketClient = require('websocket').client;
var WebSocketFrame  = require('websocket').frame;
var WebSocketRouter = require('websocket').router;
var W3CWebSocket = require('websocket').w3cwebsocket;
var http = require('http');


console.log("Serverkoden blir kjørt");


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
app.use(bodyParser.json()); // for å tolke JSON

var server = app.listen(8080);


app.get("/articles", (req, res) => {
    console.log("Request fra klient: Hente ut alle sakene");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select * from Sak",
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
                req.body.id,
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
    var kategori = req.body.category;
    console.log("Request fra klient: Hente ut saker med category: " + kategori);
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
    var viktigheit = req.body.importance;
    console.log("Request fra klient: Hente ut saker med viktigheitsgrad: " + viktigheit);
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

app.get("/category", (req, res) => {
    console.log("Request fra klient: Hente ut alle kategorier");
    pool.getConnection((err, connection) => {
        console.log("Connected to database");
        if (err) {
            console.log("Feil ved kobling til databasen");
            res.json({ error: "feil ved ved oppkobling" });
        } else {
            connection.query(
                "select * from Kategori",
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


app.post("/articles", (req, res) => {
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


app.delete("/articles/:sakID", (req, res) => {
    var id = req.params.sakID;
    console.log("Fikk DELETE-request fra klienten, sletter articles med id: " + id);
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("Feil ved oppkobling");
            res.json({ error: "feil ved oppkobling" });
        } else {
            console.log("Fikk databasekobling");
            connection.query(
                "delete from Sak where id = ?",
                req.body.id,
                err => {
                    if (err) {
                        console.log(err);
                        8 / 8
                        res.status(500);
                        res.json({ error: "Feil ved insert" });
                    } else {
                        console.log("delete ok");
                        res.send("");
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

