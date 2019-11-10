const ArticleDao = require("../dao/articledao.js");
const runsqlfile = require("./runsqlfile.js");

var mysql = require("mysql");
/*
var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "randeggu",
    password: "luOQ0NQQ",
    database: "randeggu",
    debug: false
});
*/

// GitLab CI Pool
var pool = mysql.createPool({
    connectionLimit: 1,
    host: "mysql",
    user: "root",
    password: "secret",
    database: "supertestdb",
    debug: false,
    multipleStatements: true
});

beforeAll(done => {
    runsqlfile("src/sql_script_english.sql", pool, done);
    /*
    runsqlfile("dao/create_tables.sql", pool, () => {
        runsqlfile("dao/create_testdata.sql", pool, done);
    });
    */
});

afterAll(() => {
    pool.end();
});


let articledao = new ArticleDao(pool);

test("get one article from db", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(1);
        expect(data[0].title).toBe("Ny butikk i sentrum");
        done();
    }
    articledao.getOne(1, callback);
});

test("get all articles from db", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThanOrEqual(22);
        expect(data[0].title).toBe("Ny butikk i sentrum");
        expect(data[1].title).toBe("Bankran på båten");
        done();
    }
    articledao.getAll(callback);
});

test("update article in db", done => {
    let title_before = "";
    let article = {};
    let title_after = "";

    function callback1(status, data) {
        expect(data[0].title).toBe("Spennende artikkel");
        article = data[0];
        title_before = data[0].title;


        article.title = "Ikke spennende artikkel";
        articledao.updateOne(article, callback2);
    }

    function callback2(status, data) {
        expect(data.affectedRows).toBe(1);

        articledao.getOne(6, callback3);
    }

    function callback3(status, data){
        expect(data[0].title).toBe("Ikke spennende artikkel");
        title_after = data[0].title;
        expect(title_before).toEqual(title_after);
        done();
    }

    articledao.getOne(6, callback1);

});

test("post article to db", done => {
    function callback(status, data) {
        expect(data.affectedRows).toBe(1);
        done()
    }
    articledao.createOne({title: "Ny artikkel", text: "bla bla", image: "url", alt: "alt alt", category: "Kultur", importance: 1, image_text: "bildetekst", creator: "user123"}, callback);
});

test("delete article from db", done => {
    let initialTableSize;

    function callback1(status, data){
        expect(data.length).toBeGreaterThanOrEqual(22);
        initialTableSize = data.length;
        articledao.deleteOne(5, callback2);
    }

    function callback2(status, data){
        expect(data.affectedRows).toBe(1);
        articledao.getAll(callback3)
    }

    function callback3(status, data){
        expect(data.length).toBeGreaterThanOrEqual(21);
        expect(data.length).toBe(initialTableSize - 1);
        done();
    }

    articledao.getAll(callback1);
});