
var mysql = require("mysql");
//const runsqlfile = require("./runsqlfile.js");
const runsqlfile = require("./runsqlfileV2");
var fs = require("fs");


module.exports = async () => {

    /*
    var pool = mysql.createPool({
        connectionLimit: 2,
        host: "mysql.stud.iie.ntnu.no",
        user: "randeggu",
        password: "luOQ0NQQ",
        database: "randeggu",
        debug: false,
        multipleStatements: true

    });
    */

// GitLab CI Pool
    var pool = mysql.createPool({
        connectionLimit: 1,
        host: "mysql",
        user: "root",
        password: "secret",
        database: "supertestdb",
        debug: false,
        multipleStatements: true
    });

    runsqlfile("src/daoTests/sql_script_english.sql", pool, () => {
       runsqlfile("src/daoTests/sql_script_english_data.sql", pool, () => {
           console.log("done reading sql file");
       });
    });

/*
    beforeAll(done => {
        runsqlfile("src/sql_script_english.sql", pool, () => {
            runsqlfile("src/sql_script_english_data.sql", pool, done);
        });
    });
*/


/*
    let sql = fs.readFileSync("src/sql_script_english.sql", "utf8");
    pool.getConnection((err, connection) => {
        if (err) {
            console.log("runsqlfile: error connecting");
            done();
        } else {
            console.log("runsqlfile: connected");
            connection.query(sql, (err, rows) => {
                connection.release();
                if (err) {
                    console.log("runsqlfile: " + err);
                } else {
                    console.log("runsqlfile: run ok");
                    let sql = fs.readFileSync("src/sql_script_english_data.sql", "utf8");
                    pool.getConnection((err, connection) => {
                        if (err) {
                            console.log("runsqlfile: error connecting");
                        } else {
                            console.log("runsqlfile: connected");
                            connection.query(sql, (err, rows) => {
                                connection.release();
                                if (err) {
                                    console.log("runsqlfile: " + err);
                                } else {
                                    console.log("runsqlfile: run ok");
                                }
                            });
                        }
                    });
                }
            });
        }
    });
*/
/*
    function (done) => {runsqlfile("src/sql_script_english.sql", pool, () => {
        runsqlfile("src/sql_script_english_data.sql", pool, done);
    });
*/


    /*
    // ...
    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = mongod;
    */
    global.__MONGOD__ = pool;
};