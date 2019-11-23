// @flow

const regeneratorRuntime = require('regenerator-runtime/runtime');
const mysql = require('mysql');
const runsqlfile = require('./runsqlfile');

/**
 * The script that runs before all the server tests.
 * Sets up the database tables and the test data. Drops previously existing tables first.
 *
 * Creates a mysql pool that is ended in "setupTestDatabase.js".
 * Could probably end the pool here but wants to show that we can reference the pool after all the tests has run.
 */

module.exports = async () => {
    // GitLab CI Pool
    const pool: mysql.Pool = mysql.createPool({
        connectionLimit: 1,
        host: 'mysql',
        user: 'root',
        password: 'secret',
        database: 'supertestdb',
        debug: false,
        multipleStatements: true
    });

    // Creates tables first and then fills them with the test data.
    runsqlfile('src/daoTests/sql_script_english.sql', pool, () => {
        runsqlfile('src/daoTests/sql_script_english_data.sql', pool, () => {
            console.log('done reading sql file');
        });
    });

    // Set reference to mongod in order to close the server during teardown.
    global.__MONGOD__ = pool;
};
