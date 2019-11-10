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
    debug: false,
    multipleStatements: true

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

/*
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
/*
beforeAll(done => {
    runsqlfile("src/databaseSQLfiles/categoryTable.sql", pool, () => {
        runsqlfile("src/databaseSQLfiles/userTable.sql", pool, () => {
            runsqlfile("src/databaseSQLfiles/articleTable.sql", pool, () => {
                runsqlfile("src/databaseSQLfiles/commentTable.sql", pool, () => {
                    runsqlfile("src/sql_script_english_data.sql", pool, done);
                });
            });
        });
    });
});

afterAll(done => {
    runsqlfile("src/databaseSQLfiles/teardown.sql", pool, done);
    pool.end();
});
*/
/*

afterAll(() => {
    runsqlfile("src/databaseSQLfiles/teardown.sql", pool, done);
    pool.end();
});
*/

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