// @flow

const mysql = require('mysql');

module.exports = class Dao {
    pool: mysql.Pool;

    constructor(pool: mysql.Pool) {
        this.pool = pool;
    }

    query(sql: string, params: Array<mixed>, callback: (number, {}) => mixed) {
        this.pool.getConnection((err, connection) => {
            console.log('dao: connected to database');
            if (err || !connection) {
                console.log('dao: error connecting');
                callback(500, { error: 'error connecting to the database' });
            } else {
                //             console.log("dao: running sql: " + sql);
                connection.query(sql, params, (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(500, { error: 'error querying' });
                    } else {
                        console.log('dao: returning rows');
                        callback(200, rows);
                    }
                });
            }
        });
    }
};
