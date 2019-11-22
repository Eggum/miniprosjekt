// @flow

const Dao = require('./dao.js');

module.exports = class CategoryDao extends Dao {
    getAll(callback: (number, { length: number }) => mixed) {
        super.query('select * from Category', [], callback);
    }
};
