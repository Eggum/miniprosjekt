// @ flow

const mysql = require('mysql');
const fs = require('fs');

module.exports = function run(
    filename: string,
    pool: mysql.Pool,
    callback: () => mixed
) {
    console.log('runsqlfile: reading file ' + filename);
    let sql = fs.readFileSync(filename, 'utf8');

    pool.getConnection((err, connection) => {
        if (err) {
            console.log('runsqlfile: error connecting' + err);
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
