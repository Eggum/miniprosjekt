
var mysql = require("mysql");
//const runsqlfile = require("./runsqlfile.js");
const runsqlfile = require("./runsqlfileV2");


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

    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = pool;
};