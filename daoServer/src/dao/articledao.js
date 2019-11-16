// @ flow

const Dao = require("./dao.js");


module.exports = class ArticleDao extends Dao {
    getAll(callback) {
        super.query("select * from Article", [], callback);
    }

    getOne(id, callback) {
        super.query(
            "select Article.*, User.username from Article join User on User.id = Article.creator where Article.id = ?",
            [id],
            callback
        );
    }
/*
    deleteOne(id, callback) {
        super.query(
            "delete from Article where id = ?",
            [id],
            callback
        );
    }
*/

    deleteOne(id, callback) {
        super.query(
            "CALL delete_article(?)",
            [id],
            callback
        );
    }

    createOne(json, callback) {
        let val = [json.title, json.text, json.image, json.alt, json.category, json.importance, json.image_text, json.creator];
        super.query(
            "insert into Article (title, text, image, alt, category, importance, image_text, creator) values (?,?,?,?,?,?,?,?)",
            val,
            callback
        );
    }

    updateOne(json, callback) {
        let val = [json.title, json.text, json.image, json.alt, json.category, json.importance, json.image_text, json.creator, json.id];
        super.query(
            "update Article set title = ?, text = ?, image = ?, alt = ?, category = ?, importance = ?, image_text = ?, creator = ? where id = ?",
            val,
            callback
        );
    }
};
