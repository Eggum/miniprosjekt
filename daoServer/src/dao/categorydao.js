// @flow

const Dao = require('./dao.js');

/**
 * The category dao. Handles all calls to the database concerning categories.
 */

module.exports = class CategoryDao extends Dao {
    // gets all categories from db.
    getAll(callback: (number, { length: number }) => mixed) {
        super.query('select * from Category', [], callback);
    }
};
