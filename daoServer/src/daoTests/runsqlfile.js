// @flow

const mysql = require('mysql');
const fs = require('fs');

/**
 * Function that runs sql script in the db.
 * Takes in a mySql pool, the filename and a callback function.
 */

module.exports = function run(
    filename: string,
    pool: mysql.Pool,
    callback: () => mixed
) {
    console.log('runsqlfile: reading file ' + filename);
    let sql = fs.readFileSync(filename, 'utf8');

    pool.getConnection((err, connection) => {
        if (err || !connection) {
            console.log('runsqlfile: error connecting');
            console.log(err);
            callback();
        } else {
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    console.log('runsqlfile: ' + err);
                    callback();
                } else {
                    console.log('runsqlfile: run ok');
                    console.log(result);
                    callback();
                }
            });
        }
    });
};
