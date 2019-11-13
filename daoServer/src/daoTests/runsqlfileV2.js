var mysql = require("mysql");
var fs = require("fs");

module.exports = function run(filename, pool, callback) {
    console.log("runsqlfile: reading file " + filename);
    let sql = fs.readFileSync(filename, "utf8");

    pool.getConnection((err, connection) => {
        if (err) {
            console.log("runsqlfile: error connecting" + err);
            callback();
        } else {
            connection.query(sql, (err, result) => {
                connection.release();
                if (err) {
                    console.log("runsqlfile: " + err);
                    callback();
                } else {
                    console.log("runsqlfile: run ok");
                    console.log(result);
                    callback();
                }
            });
        }
    });
};
