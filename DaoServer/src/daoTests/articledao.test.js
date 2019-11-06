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
        expect(data.length).toBe(23);
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
    }

    function callback2(status, data) {
        expect(data[0].title).toBe("Ikke spennende artikkel");
        title_after = data[0].title;
        expect(title_before).toEqual(title_after);
        done();
    }

    articledao.getOne(6, callback1);

    article.title = "Ikke spennende artikkel";
    articledao.updateOne(article, callback2);
});

// post
// delete