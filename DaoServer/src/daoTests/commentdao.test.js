// @ flow

const CommentDao = require("../dao/commentdao.js");
const runsqlfile = require("./runsqlfile.js");

var mysql = require("mysql");

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
    runsqlfile("src/sql_script_english.sql", pool, () => {
        runsqlfile("src/sql_script_english_data.sql", pool, done);
    });
});
/*
beforeAll(done => {
    runsqlfile("src/sql_script_english.sql", pool, done);

});
*/

afterAll(() => {
    pool.end();
});


let commentdao = new CommentDao(pool);

test("get all comments from db to article 1", done => {
    function callback(status, data){
        console.log(
            "Test callback: status = " + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(6);
        expect(data[0].text).toBe("Dette var en kul artikkel");
        done();
    }
    commentdao.getAllFromArticle(1, callback);
});

test("add comment to article 2", done => {
    function callback1(status, data){
        expect(data.affectedRows).toBe(1);
        commentdao.getAllFromArticle(2, callback2)
    }

    function callback2(status, data){
        expect(data.length).toBe(1);
        expect(data[0].text).toBe("hei");
        done();
    }


    commentdao.createOne({text: "hei", creator: 2, article: 2}, callback1);
});

test(".delete one comment from an article", done => {
    function callback1(status, data){
        expect(data.length).toBe(1);
        commentdao.deleteOne(7, callback2);
    }

    function callback2(status, data){
        expect(data.affectedRows).toBe(1);
        commentdao.getAllFromArticle(3, callback3);
    }

    function callback3(status, data){
        expect(data.length).toBe(0);
        done();
    }

    commentdao.getAllFromArticle(3, callback1);
});