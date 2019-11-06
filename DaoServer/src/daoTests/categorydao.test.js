// @ flow

const CategoryDao = require("../dao/categorydao.js");
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


let categorydao = new CategoryDao(pool);

test("get all categories from db", done => {
    function callback(status, data){
        console.log(
            "Test callback: status = " + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBe(5);
        expect(data[0].category).toBe("Kjendis");
        done();
    }

    categorydao.getAll(callback);
});