const Dao = require("./dao.js");


module.exports = class UserDao extends Dao {
    getAll(callback) {
        super.query("select * from User", [], callback);
    }

    getOne(username, callback) {
        super.query(
            "select * from User where username= ?",
            [username],
            callback
        );
    }

    deleteOne(username, callback) {
        super.query(
            "delete from User where username = ?",
            [username],
            callback
        );
    }

    createOne(json, callback) {
        var val = [json.username, json.password];
        super.query(
            "insert into User (username, password) values (?,?)",
            val,
            callback
        );
    }
};
