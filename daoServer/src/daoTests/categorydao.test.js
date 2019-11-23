// @flow

const CategoryDao = require('../dao/categorydao.js');
const mysql = require('mysql');

/**
 * Tests the category dao. Uses continuous integration through gitLab with gitLab CI pool.
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

let categorydao = new CategoryDao(pool);

/*
Gets all categories from db and checks we fetched them all and that the first one has the correct value.
 */
test('get all categories from db', done => {
    function callback(status, data) {
        console.log(
            'Test callback: status = ' +
                status +
                ', data=' +
                JSON.stringify(data)
        );
        expect(data.length).toBe(5);
        expect(data[0].category).toBe('Kjendis');
        done();
    }

    categorydao.getAll(callback);
});
