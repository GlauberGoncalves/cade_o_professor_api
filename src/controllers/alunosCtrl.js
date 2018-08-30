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
			res.send(JSON.stringify({
				"status": 200,
				"error": null,
				"response": results
			}));
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
		SELECT a.nome, d.nome_disciplina, p.nome_professor,p.status, dp.bloco, dp.sala FROM alunos a
		INNER JOIN segue s ON s.fk_aluno=a.id_aluno
		INNER JOIN disc_professor dp ON dp.id_disc_professor=s.fk_disc_professor
		INNER JOIN disciplina d ON d.id_disciplina=dp.fk_disciplina
		INNER JOIN professores p ON p.id_professor=dp.fk_professor
		WHERE A.id_aluno = ${req.params.id};
	`;

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
		INSERT INTO segue(fk_disc_professor, fk_aluno)
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