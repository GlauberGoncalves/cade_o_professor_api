var mysql = require("mysql");

module.exports = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "cade_o_professor",
    password: ""
});