var express = require('express');
var bodyParser = require('body-parser');
var multiparty = require('connect-multiparty');
var con = require("./bin/connection");

var app = express();

//body-parser
app.use(bodyParser.urlencoded({
	extended: true
}));
app.use(bodyParser.json());
app.use(multiparty());

app.use(function (req, res, next) {

	res.setHeader("Access-Control-Allow-Origin", "*");
	res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
	res.setHeader("Access-Control-Allow-Headers", "content-type");
	res.setHeader("Access-Control-Allow-Credentials", true);

	next();
});

var port = 8080;
app.listen(port);

console.log('Servidor HTTP esta escutando na porta ' + port);
try {
	con.connect();
} catch (e) {
	console.log("BANCO DE DADOS OFFLINE")
}


app.get('/', function (req, res) {
	res.redirect("/api/v1/")
});

app.get('/api', (req, rep) => {
	rep.redirect("/api/v1/")
})

//GET (ready)
app.get('/api/v1/', function (req, res) {

	res.json({
		name: "Cadê o Professor",
		version: "0.0.1",
		team: "Inovação e Projeto Integrado II",
	})
});

/**
 * dados de usuario
 */

// recupera todos os alunos
app.get("/api/v1/alunos/", (req, res) => {

	con.query('SELECT * from alunos', function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"error": error,
				"response": "ops... tentei mas não deu"
			}));
			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({
				"status": 200,
				"error": null,
				"response": results
			}));
			//If there is no error, all is good and response is 200 OK.
		}
	});

})

// recupera alunos por id
app.get("/api/v1/alunos/:id", (req, res) => {

	con.query(`SELECT * from alunos WHERE id_aluno=${req.params.id}`, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {
			res.send(JSON.stringify({
				"status": 200,
				"error": null,
				"response": results
			}));
		}

	});
})

// recupera disciplinas seguidas pelo aluno por id

app.get("/api/v1/alunos/segue/:id", (req, res) => {

	let query = `
		SELECT a.nome, d.nome_disciplina, p.nome_professor,p.status, dp.bloco, dp.sala FROM alunos a
		INNER JOIN segue s ON s.fk_aluno=a.id_aluno
		INNER JOIN disc_professor dp ON dp.id_disc_professor=s.fk_disc_professor
		INNER JOIN disciplina d ON d.id_disciplina=dp.fk_disciplina
		INNER JOIN professores p ON p.id_professor=dp.fk_professor
		WHERE A.id_aluno = ${req.params.id};
	`;

	con.query(query, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {
			res.send(JSON.stringify({
				"status": 200,
				"error": null,
				"response": results
			}));
		}
	});
})


/**
 * dados de disciplinas
 */

app.get("/api/v1/disciplinas/", (req, res) => {

	let query = `
		SELECT * FROM disciplina;
	`;

	con.query(query, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {
			res.send(JSON.stringify({
				"status": 200,
				"error": null,
				"response": results
			}));
		}
	});
})

app.get("/api/v1/disciplinas/:id", (req, res) => {

	let query = `
		SELECT * FROM disciplina WHERE id_disciplina=${req.params.id};
	`;

	con.query(query, function (error, results, fields) {
		if (error || results.length == 0) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {
			console.log(results.length)
			res.send(JSON.stringify({
				"status": 200,
				"error": null,
				"response": results
			}));
		}
	});
})



// disciplina x professor

app.get("/api/v1/disciplinas/professor/:id", (req, res) => {

	let query = `
		SELECT d.nome_disciplina, d.descricao, dp.bloco, dp.sala, p.nome_professor, p.status FROM disc_professor dp
		INNER JOIN professores p ON p.id_professor=dp.fk_professor
		INNER JOIN disciplina d ON d.id_disciplina=dp.fk_disciplina
		WHERE d.id_disciplina=${req.params.id};
	`;

	let queryHorarios = `
		SELECT h.dia_semana, h.hora FROM disc_professor dp
		INNER JOIN horarios h ON h.fk_disc_professor=dp.id_disc_professor
		WHERE dp.id_disc_professor=${req.params.id}
		ORDER BY h.dia_semana asc
	`


	con.query(query, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {

			con.query(queryHorarios, function (error, results2, fields) {
				if (error) {
					res.send(JSON.stringify({
						"status": 500,
						"response": "ops... tentei mas não deu"
					}));
				} else {

					let resultFinal = {
						"nome_disciplina": results[0].nome_disciplina,
						"descricao": results[0].descricao,
						"bloco": results[0].bloco,
						"sala": results[0].sala,
						"nome_professor": results[0].nome_professor,
						"status": results[0].status,
						"grade": []
					}
					
					for (let i = 0; i < results2.length; i++) {

						if (i == 0) {
							resultFinal.grade.push({
								"dia_semana": results2[i].dia_semana,
								"horarios": [results2[i].hora]
							});

						} else {

							let tamanho = resultFinal.grade.length
							if (resultFinal.grade[tamanho - 1].dia_semana == results2[i].dia_semana) {
								resultFinal.grade[tamanho - 1].horarios.push(results2[i].hora)
								console.log(resultFinal.grade)
								console.log('saiu do segundo if')

							} else {
								resultFinal.grade.push({
									"dia_semana": results2[i].dia_semana,
									"horarios": [results2[i].hora]
								});
							}
						}
						results2[0]
					}

					res.send(JSON.stringify({
						"status": 200,
						"error": null,
						"response": resultFinal
					}));
				}
			});
		}
	});
})