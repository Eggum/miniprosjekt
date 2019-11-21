const regeneratorRuntime = require("regenerator-runtime/runtime");
var mysql = require("mysql");
const runsqlfile = require("./runsqlfileV2");


module.exports = async () => {

    let pool = mysql.createPool({
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