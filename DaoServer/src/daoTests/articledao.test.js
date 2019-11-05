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

// getone
// getall

// update
// post
// delete