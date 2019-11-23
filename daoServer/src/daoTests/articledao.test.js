// @flow

const ArticleDao = require('../dao/articledao.js');
const mysql = require('mysql');

/**
 * Tests the article dao. Uses continuous integration through gitLab with gitLab CI pool.
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

let articledao = new ArticleDao(pool);

/*
Gets all articles from the database, checks if we received more that 21 articles and checks if the title of the two first articles are correct.
 */
test('get all articles from db', done => {
    function callback(status, data) {
        expect(data.length).toBeGreaterThanOrEqual(22);
        expect(data[0].title).toBe('Ny butikk i sentrum');
        expect(data[1].title).toBe('Bankran på båten');
        done();
    }
    articledao.getAll(callback);
});

/*
Gets one article from the database and checks if the info is correct.
 */
test('get article from db', done => {
    function callback(status, data) {
        expect(data[0].title).toBe('Ny butikk i sentrum');
        expect(data[0].alt).toBe('alt teskt');
        expect(data[0].creator).toBe(1);
        expect(data[0].importance).toBe(1);

        done();
    }
    articledao.getAll(callback);
});

/*
Updates an article in the database.
Checks the initial title of the article, alters the title and checks if the new title is changes correctly.
 */
test('update article in db', done => {
    let title_before = '';
    let article = {};

    function callback1(status, data) {
        expect(data[0].title).toBe('Spennende artikkel');
        article = data[0];
        title_before = data[0].title;

        let art = {
            title: 'Ikke spennende artikkel',
            text: data[0].text,
            image: data[0].image,
            alt: data[0].alt,
            category: data[0].category,
            importance: data[0].importance,
            image_text: data[0].image_text,
            creator: data[0].creator,
            id: data[0].id
        };
        articledao.updateOne(art, callback2);
    }

    function callback2(status, data) {
        expect(data.affectedRows).toBe(1);

        articledao.getOne(6, callback3);
    }

    function callback3(status, data) {
        expect(data[0].title).toBe('Ikke spennende artikkel');
        done();
    }

    articledao.getOne(6, callback1);
});

/*
Posts an article to the database and checks if it was a success.
 */
test('post article to db', done => {
    function callback(status, data) {
        expect(data.affectedRows).toBe(1);
        done();
    }
    articledao.createOne(
        {
            title: 'Ny artikkel',
            text: 'bla bla',
            image: 'url',
            alt: 'alt alt',
            category: 'Kultur',
            importance: 1,
            image_text: 'bildetekst',
            creator: 1
        },
        callback
    );
});

/*
Deletes one article from db.
Checks how many articles there are in the db initially, deletes one and checks if there are one less article in the db.
 */
test('removes one article from db', done => {
    let initialTableSize;

    function callback1(status, data) {
        expect(data.length).toBeGreaterThanOrEqual(22);
        initialTableSize = data.length;
        articledao.deleteOne(5, callback2);
    }

    function callback2(status, data) {
        expect(data.affectedRows).toBe(1);
        articledao.getAll(callback3);
    }

    function callback3(status, data) {
        expect(data.length).toBeGreaterThanOrEqual(21);
        expect(data.length).toBe(initialTableSize - 1);
        done();
    }

    articledao.getAll(callback1);
});
