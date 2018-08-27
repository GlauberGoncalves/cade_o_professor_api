var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var con = require("./bin/connection");

var app = express();

//body-parser
app.use(bodyParser.urlencoded({ extended:true}));
app.use(bodyParser.json());
app.use(multiparty());

app.use(function(req, res, next){

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

var port = 8080;
app.listen(port);

console.log('Servidor HTTP esta escutando na porta ' + port);

app.get('/', function(req, res){
	res.redirect("/api/v1/")
});


app.get('/api', (req, rep) => {
	rep.redirect("/api/v1/")
})

//GET (ready)
app.get('/api/v1/', function(req, res){
	
	res.json({
		name:"Cadê o Professor",
		version: "0.0.1",
		team: "Inovação e Projeto Integrado II",		
	})
});

app.get("/api/v1/alunos/", (req, res) => {
	con.connect();

	con.query('SELECT * from alunos', function (error, results, fields) {
		if(error){
			res.send(JSON.stringify({"status": 500, "error": error, "response": "ops... tentei mas não deu"})); 
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
			//If there is no error, all is good and response is 200 OK.
		}
	});

	  con.end();
})