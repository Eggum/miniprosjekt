// @flow

const Dao = require('./dao.js');

module.exports = class UserDao extends Dao {
    createOne(
        json: { username: string, password: string },
        callback: (number, { affectedRows: number }) => mixed
    ) {
        let val = [json.username, json.password];
        super.query('CALL user_create_user(?,?)', val, callback);
    }

    validateOne(
        json: { username: string, password: string },
        callback: (number, {}) => mixed
    ) {
        let val = [json.username, json.password];
        super.query('CALL validate_user(?,?)', val, callback);
    }

    getUserId(username: string, callback: (number, {}) => mixed) {
        super.query(
            'select id from User where username = ?',
            [username],
            callback
        );
    }
};
