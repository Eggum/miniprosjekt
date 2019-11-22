// @flow

const ArticleDao = require('../dao/articledao.js');

const mysql = require('mysql');

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

afterAll(() => {
    pool.end();
});

let articledao = new ArticleDao(pool);

test('get all articles from db', done => {
    function callback(status, data) {
        expect(data.length).toBeGreaterThanOrEqual(22);
        expect(data[0].title).toBe('Ny butikk i sentrum');
        expect(data[1].title).toBe('Bankran på båten');
        done();
    }
    articledao.getAll(callback);
});

test('get article from db', done => {
    function callback(status, data) {
        expect(data[0].title).toBe('Ny butikk i sentrum');
        done();
    }
    articledao.getAll(callback);
});

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

test('delte one article from db', done => {
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
