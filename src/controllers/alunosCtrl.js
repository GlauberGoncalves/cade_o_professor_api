module.exports.login = (application, req, res) => {
	var connection = application.config.dbconnection();

	let dados = req.body

	let query = `
		SELECT COUNT(*) FROM alunos
		WHERE email='${dados.email}' and senha='${dados.senha}'
	`

	connection.query(query, (error, results, fields) => {
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
				"response": "usuario valido"
			}));
			//If there is no error, all is good and response is 200 OK.
		}
		connection.end();
	})
}

module.exports.getTodosAlunos = function (application, req, res) {

	var connection = application.config.dbconnection();

	connection.query('SELECT * from alunos', function (error, results, fields) {
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

	connection.end();

}

module.exports.getAlunoPorId = function (application, req, res) {

	var connection = application.config.dbconnection();

	connection.query(`SELECT * from alunos WHERE id_aluno=${req.params.id}`, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {

			if (results.length == 0) {
				res.send(JSON.stringify({
					"status": 404,
					"response": "Aluno não encontrado"
				}));
			} else {

				res.send(JSON.stringify({
					"status": 200,
					"error": null,
					"response": results
				}));
			}
		}

	});

	connection.end();
}

module.exports.getAlunoPorEmail = function (application, req, res) {

	var connection = application.config.dbconnection();

	connection.query(`SELECT id_aluno, nome from alunos WHERE email=${req.params.email}`, function (error, results, fields) {
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

	connection.end();

}

module.exports.getDisciplinasSeguidas = function (application, req, res) {

	var connection = application.config.dbconnection();

	let query = `
		SELECT a.nome, d.nome_disciplina, p.nome_professor,p.status, t.bloco, t.sala FROM alunos a
		INNER JOIN segue s ON s.fk_aluno=a.id_aluno
		INNER JOIN turmas t ON t.id_turma=s.fk_turma
		INNER JOIN disciplinas d ON d.id_disciplina=t.fk_disciplina
		INNER JOIN professores p ON p.id_professor=t.fk_professor
		WHERE A.id_aluno = ${req.params.id};
	`;

	console.log(query)

	connection.query(query, function (error, results, fields) {
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
	connection.end();
}

/**
 * Posts
 */

module.exports.insertSeguirDisciplina = function (application, req, res) {

	var connection = application.config.dbconnection();

	let dados = req.body

	let query = `
		INSERT INTO segue(fk_turmas, fk_aluno)
		VALUES (${dados.id}, ${dados.id_disc});
	`

	console.log(query)

	connection.query(query, function (error, results, fields) {
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

		connection.end()
	});
}

module.exports.insertAluno = function (application, req, res) {

	var connection = application.config.dbconnection();

	let dados = req.body

	let query = `
		INSERT INTO alunos(id_aluno, nome, email, senha)
		VALUES (DEFAULT, '${dados.nome}', '${dados.email}', '${dados.senha}');
	`
	console.log(query)

	connection.query(query, function (error, results, fields) {
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

		connection.end()
	});
}

/**
 * Puts
 */

module.exports.updateAluno = (application, req, res) => {

	let dados = req.body
	let connection = application.config.dbconnection()

	let query = `
		UPDATE alunos
		SET nome = '${dados.nome}',  email = '${dados.email}', senha = '${dados.senha}'
		WHERE id_aluno = ${dados.id}
	`

	connection.query(query, (error, results, fields) => {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}))
		} else {
			res.send(JSON.stringify({
				"status": 200,
				"error": null,
				"response": results
			}));
		}
		connection.end();
	})
}

/**
 * Delete
 */

module.exports.deleteAluno = (application, req, res) => {

	let dados = req.body
	let connection = application.config.dbconnection()

	let query = `
		DELETE FROM alunos
		WHERE id_aluno = ${dados.id}
	`

	connection.query(query, (error, results, fields) => {
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
		connection.end();
	})
}