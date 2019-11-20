// @ flow

const Dao = require("./dao.js");


module.exports = class ArticleDao extends Dao {
    getAll(callback : () => mixed) {
        super.query("select * from Article", [], callback);
    }

    getOne(id : number, callback : () => mixed) {
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

    deleteOne(id : number, callback : () => mixed) {
        super.query(
            "CALL delete_article(?)",
            [id],
            callback
        );
    }

    createOne(json : {title : string, text : string, image : string, alt : string, category : string, importance : number, image_text : string, creator : number}, callback : () => mixed) {
        let val = [json.title, json.text, json.image, json.alt, json.category, json.importance, json.image_text, json.creator];
        super.query(
            "insert into Article (title, text, image, alt, category, importance, image_text, creator) values (?,?,?,?,?,?,?,?)",
            val,
            callback
        );
    }

    updateOne(json : {title : string, text : string, image : string, alt : string, category : string, importance : number, image_text : string, creator : number, id : number}, callback : () => mixed) {
        let val = [json.title, json.text, json.image, json.alt, json.category, json.importance, json.image_text, json.creator, json.id];
        super.query(
            "update Article set title = ?, text = ?, image = ?, alt = ?, category = ?, importance = ?, image_text = ?, creator = ? where id = ?",
            val,
            callback
        );
    }
};
