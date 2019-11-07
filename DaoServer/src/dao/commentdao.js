const Dao = require("./dao.js");


module.exports = class CommentDao extends Dao {
    getAllFromArticle(articleID, callback) {
        super.query("select Comment.id, text, creation_date, creator, article, username from Comment join User on Comment.creator = User.id where article = ?", [articleID], callback);
    }
/*
    getOne(id, callback) {
        super.query(
            "select * from Article where id= ?",
            [id],
            callback
        );
    }
 */
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
