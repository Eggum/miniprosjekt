// @ flow

const Dao = require("./dao.js");


module.exports = class UserDao extends Dao {
    /*
    getAll(callback) {
        super.query("select * from User", [], callback);
    }
    */
/*
    getOne(username, callback) {
        super.query(
            "select * from User where username= ?",
            [username],
            callback
        );
    }
    */
/*
    deleteOne(username, callback) {
        super.query(
            "delete from User where username = ?",
            [username],
            callback
        );
    }
*/
    createOne(json : {username : string, password : string}, callback : () => mixed) {
        var val = [json.username, json.password];
        super.query(
            "CALL user_create_user(?,?)",
            val,
            callback
        );
    }

    validateOne(json : {username : string, password : string}, callback : () => mixed) {
        var val = [json.username, json.password];
        super.query(
            "CALL validate_user(?,?)",
            val,
            callback
        );
    }

    getUserId(username : string, callback : () => mixed) {
        super.query(
            "select id from User where username = ?",
            [username],
            callback
        );
    }
};
