// @ flow

const Dao = require('./dao.js');

module.exports = class CommentDao extends Dao {
    getAllFromArticle(articleID: number, callback: () => mixed) {
        super.query(
            'select Comment.id, text, creation_date, creator, article, username from Comment join User on Comment.creator = User.id where article = ? order by Comment.id asc',
            [articleID],
            callback
        );
    }

    deleteOne(id: number, callback: () => mixed) {
        super.query('delete from Comment where id = ?', [id], callback);
    }

    createOne(
        json: { text: string, creator: number, article: number },
        callback: () => mixed
    ) {
        let val = [json.text, json.creator, json.article];
        super.query(
            'insert into Comment (text, creator, article) values (?,?,?)',
            val,
            callback
        );
    }
};
