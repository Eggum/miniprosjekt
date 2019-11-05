// @ flow

const CategoryDao = require("../dao/categorydao.js");
var mysql = require("mysql");

var pool = mysql.createPool({
    connectionLimit: 2,
    host: "mysql.stud.iie.ntnu.no",
    user: "randeggu",
    password: "luOQ0NQQ",
    database: "randeggu",
    debug: false
});

let categorydao = new CategoryDao(pool);

test("get all categories from db", done => {
    function callback(status, data){
        console.log(
            "Test callback: status = " + status + ", data=" + JSON.stringify(data)
        );
        expect(data.length).toBeGreaterThan(4);
        expect(data[0].category).toBe("Kjendis");
        done();
    }

    categorydao.getAll(callback);
});