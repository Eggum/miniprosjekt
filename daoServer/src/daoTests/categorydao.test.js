// @ flow

const CategoryDao = require("../dao/categorydao.js");

var mysql = require("mysql");

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