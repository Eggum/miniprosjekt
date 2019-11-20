const Dao = require("./dao.js");

module.exports = class CategoryDao extends Dao {
    getAll(callback : () => mixed) {
        super.query("select * from Category", [], callback);
    }
/*
    createOne(json, callback) {
        var val = [json.category];
        super.query(
            "insert into Category (category) values (?)",
            val,
            callback
        );
    }
*/
};
