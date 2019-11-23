// @flow

const Dao = require('./dao.js');

/**
 * The user dao. Handles all calls to the database concerning users.
 */

module.exports = class UserDao extends Dao {
    /*
    Creates one user in the db based upon the username and password.
    Uses the stored procedure "create user" that hashes the password with salt with mySql password function.
     */
    createOne(
        json: { username: string, password: string },
        callback: (number, { affectedRows: number }) => mixed
    ) {
        let val = [json.username, json.password];
        super.query('CALL user_create_user(?,?)', val, callback);
    }

    /*
    Validates an user in the db.
    Uses the stored procedure "validate user" that hashes the password sent in with salt and checks if it matches the hashed password stored in the db.
    The stored procedure returns 1 (true) if password is correct, else 0 (false).
     */
    validateOne(
        json: { username: string, password: string },
        callback: (number, {}) => mixed
    ) {
        let val = [json.username, json.password];
        super.query('CALL validate_user(?,?)', val, callback);
    }

    /*
    Fetches the users id from the db.
     */
    getUserId(username: string, callback: (number, {}) => mixed) {
        super.query(
            'select id from User where username = ?',
            [username],
            callback
        );
    }
};
