var mysql = require('mysql');

var connMySQL = function(){
	return mysql.createConnection({
		host : 'localhost',
        user : 'root',
        database: 'cade_o_professor',
		password : ''	
	});
};

module.exports = function () {
	return connMySQL;
};