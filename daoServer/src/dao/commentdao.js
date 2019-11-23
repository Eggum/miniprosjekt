// @flow

const Dao = require('./dao.js');

/**
 * The comment dao. Handles all calls to the database concerning comments.
 */

module.exports = class CommentDao extends Dao {
    // gets all comments belonging to one article based upon article id.
    getAllFromArticle(
        articleID: number,
        callback: (number, { length: number }) => mixed
    ) {
        super.query(
            'select Comment.id, text, creation_date, creator, article, username from Comment join User on Comment.creator = User.id where article = ? order by Comment.id asc',
            [articleID],
            callback
        );
    }

    // deletes one comment based upon comment id.
    deleteOne(
        id: number,
        callback: (number, { affectedRows: number }) => mixed
    ) {
        super.query('delete from Comment where id = ?', [id], callback);
    }

    // creates one comment in the db.
    createOne(
        json: { text: string, creator: number, article: number },
        callback: (number, { affectedRows: number }) => mixed
    ) {
        let val = [json.text, json.creator, json.article];
        super.query(
            'insert into Comment (text, creator, article) values (?,?,?)',
            val,
            callback
        );
    }
};
