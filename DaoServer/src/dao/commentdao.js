const Dao = require("./dao.js");


module.exports = class CommentDao extends Dao {
    getAllFromArticle(articleID, callback) {
        super.query("select * from Comment where article = ?", articleID, [], callback);
    }

    deleteOne(id, callback) {
        super.query(
            "delete from Comment where id = ?",
            [id],
            callback
        );
    }

    createOne(json, callback) {
        var val = [json.text, json.creator, json.article];
        super.query(
            "insert into Comment (text, creator, article) values (?,?,?)",
            val,
            callback
        );
    }
};
