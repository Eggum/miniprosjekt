// @ flow

const UserDao = require("../dao/userdao.js");
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

afterAll(() => {
    pool.end();
});


let userdao = new UserDao(pool);

test("create user in db", done => {
    function callback1(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data.affectedRows).toBe(1);
        done();
    }
    userdao.createOne({username: "Test-user", password: "BlaBla123"}, callback1);
});

test("get user in db", done => {
    function callback(status, data){
        console.log(
            "Test callback: status=" + status + ", data=" + JSON.stringify(data)
        );
        expect(data[0].id).toBe(1);
        done();
    }
    userdao.getOne({username: "Anonym"}, callback);
});

test("validate user in db", done => {
    function callback1(status, data){
        userdao.validateOne({username: "NewUser", password: "kult"}, callback2)

    }
    function callback2(status, data){
        expect(data[0][0].validationResult).toBe(0);
        userdao.validateOne({username: "NewUser", password: "kult123"}, callback3)
    }

    function callback3(status, data){
        expect(data[0][0].validationResult).toBe(1);
        done();
    }

    userdao.createOne({username: "NewUser", password: "kult123"}, callback1);
});
