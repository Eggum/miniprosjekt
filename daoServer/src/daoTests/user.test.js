// @flow

const UserDao = require('../dao/userdao.js');
const mysql = require('mysql');

/**
 * Tests the user dao. Uses continuous integration through gitLab with gitLab CI pool.
 */

// GitLab CI Pool
const pool = mysql.createPool({
    connectionLimit: 1,
    host: 'mysql',
    user: 'root',
    password: 'secret',
    database: 'supertestdb',
    debug: false,
    multipleStatements: true
});

// releases resources after tests.
afterAll(() => {
    pool.end();
});

let userdao = new UserDao(pool);

/*
creates a new user in the db and checks if it was a success.
 */
test('create user in db', done => {
    function callback1(status, data) {
        console.log(
            'Test callback: status=' + status + ', data=' + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }
    userdao.createOne(
        { username: 'Test-user', password: 'BlaBla123' },
        callback1
    );
});

/*
Validates a user in the db.
First it creates a new user in the database and checks if that was a success.
Then tries to validate the user with a wrong password and checks if that was a success.
Then tries to validate the user with the correct password and checks if that was a success.
 */
test('validate user in db', done => {
    function callback1(status, data) {
        expect(data.affectedRows).toBe(1);

        userdao.validateOne(
            { username: 'NewUser', password: 'kult' },
            callback2
        );
    }
    function callback2(status, data) {
        expect(data[0][0].validationResult).toBe(0);
        userdao.validateOne(
            { username: 'NewUser', password: 'kult123' },
            callback3
        );
    }

    function callback3(status, data) {
        expect(data[0][0].validationResult).toBe(1);
        done();
    }

    userdao.createOne({ username: 'NewUser', password: 'kult123' }, callback1);
});

/*
Gets the id of a user from the db and checks if it is correct.
 */
test('get id of user', done => {
    function callback(status, data) {
        expect(data[0].id).toBe(1);
        done();
    }
    userdao.getUserId('Anonym', callback);
});
