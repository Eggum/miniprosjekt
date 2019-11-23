// @flow

const Dao = require('./dao.js');

/**
 * The article dao. Handles all calls to the database concerning articles.
 */

module.exports = class ArticleDao extends Dao {
    // gets all articles from db.
    getAll(callback: (number, { length: number }) => mixed) {
        super.query('select * from Article', [], callback);
    }

    // gets one article from db based upon article id.
    getOne(id: number, callback: (number, {}) => mixed) {
        super.query(
            'select Article.*, User.username from Article join User on User.id = Article.creator where Article.id = ?',
            [id],
            callback
        );
    }

    // deletes one article from db based upon id.
    deleteOne(
        id: number,
        callback: (number, { affectedRows: number }) => mixed
    ) {
        super.query('CALL delete_article(?)', [id], callback);
    }

    // creates one article in db.
    createOne(
        json: {
            title: string,
            text: string,
            image: string,
            alt: string,
            category: string,
            importance: number,
            image_text: string,
            creator: number
        },

        callback: (number, { insertId: number, affectedRows: number }) => mixed
    ) {
        let val = [
            json.title,
            json.text,
            json.image,
            json.alt,
            json.category,
            json.importance,
            json.image_text,
            json.creator
        ];
        super.query(
            'insert into Article (title, text, image, alt, category, importance, image_text, creator) values (?,?,?,?,?,?,?,?)',
            val,
            callback
        );
    }

    // updates one article in the db based upon id
    updateOne(
        json: {
            title: string,
            text: string,
            image: string,
            alt: string,
            category: string,
            importance: number,
            image_text: string,
            creator: number,
            id: number
        },
        callback: (number, { affectedRows: number }) => mixed
    ) {
        let val = [
            json.title,
            json.text,
            json.image,
            json.alt,
            json.category,
            json.importance,
            json.image_text,
            json.creator,
            json.id
        ];
        super.query(
            'update Article set title = ?, text = ?, image = ?, alt = ?, category = ?, importance = ?, image_text = ?, creator = ? where id = ?',
            val,
            callback
        );
    }
};
