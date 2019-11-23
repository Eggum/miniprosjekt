// @flow

const CommentDao = require('../dao/commentdao.js');
const mysql = require('mysql');

/**
 * Tests the comment dao. Uses continuous integration through gitLab with gitLab CI pool.
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

let commentdao = new CommentDao(pool);

/*
Gets all comments from db belonging to article 1 and checks if we fetched them all.
 */
test('get all comments from db to article 1', done => {
    function callback(status, data) {
        console.log(
            'Test callback: status = ' +
                status +
                ', data=' +
                JSON.stringify(data)
        );
        expect(data.length).toBe(6);
        done();
    }
    commentdao.getAllFromArticle(1, callback);
});

/*
Adds one comment to article 2.
Checks if the comment is added successfully and that the value of the new comment is correct.
 */
test('add comment to article 2', done => {
    function callback1(status, data) {
        expect(data.affectedRows).toBe(1);
        commentdao.getAllFromArticle(2, callback2);
    }

    function callback2(status, data) {
        expect(data.length).toBe(1);
        expect(data[0].text).toBe('hei');
        done();
    }

    commentdao.createOne({ text: 'hei', creator: 2, article: 2 }, callback1);
});

/*
Deletes one comment from an article with the id 3.
Checks initially that number of comments belonging to the article is correct.
Then deletes the comment and check if that was a success.
Then checks if the article has one less comment belonging to it.
 */
test('remove one comment from an article', done => {
    function callback1(status, data) {
        expect(data.length).toBe(1);
        commentdao.deleteOne(7, callback2);
    }

    function callback2(status, data) {
        expect(data.affectedRows).toBe(1);
        commentdao.getAllFromArticle(3, callback3);
    }

    function callback3(status, data) {
        expect(data.length).toBe(0);
        done();
    }

    commentdao.getAllFromArticle(3, callback1);
});
