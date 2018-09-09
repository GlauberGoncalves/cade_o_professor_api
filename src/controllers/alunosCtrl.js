let p = console.log

// ok
module.exports.login = (application, req, res) => {
	var connection = application.config.dbconnection();

	let dados = req.body

	let query = `
		SELECT token FROM alunos
		WHERE email='${dados.email}' and senha='${dados.senha}'
	`

	connection.query(query, (error, results, fields) => {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,				
				"response": "Erro Inesperado"
			}));
			
		} else {
			res.send(JSON.stringify({
				"status": 200,				
				"response": results
			}));
			
		}
		connection.end();
	})
}

// ok
module.exports.alunosGet = function (application, req, res) {

	var connection = application.config.dbconnection();

	connection.query('SELECT * from alunos', function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "Erro Inesperado"
			}));

			//If there is error, we send the error in the error section with 500 status
		} else {
			res.send(JSON.stringify({
				"status": 200,				
				"response": results
			}));
			//If there is no error, all is good and response is 200 OK.
		}
	});

	connection.end();

}

// ok
module.exports.alunosIdGet = function (application, req, res) {

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
					"response": results
				}));
			}
		}

	});

	connection.end();
}

// ok
module.exports.alunoEmailGet = function (application, req, res) {

	var connection = application.config.dbconnection();

	connection.query(`SELECT id_aluno, nome, email from alunos WHERE email=${req.params.email}`, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {
			if(results.length){
				res.send(JSON.stringify({
					"status": 200,					
					"response": results
				}));
			} else {
				res.send(JSON.stringify({
					"status": 404,					
					"response": "Aluno não encontrado"
				}));				
			}
		}
	});

	connection.end();

}

// ok
module.exports.alunosTurmasSeguidasIdGet = function (application, req, res) {

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

			if(results.length){
				res.send(JSON.stringify({
					"status": 200,				
					"response": results
				}));
			} else {
				res.send(JSON.stringify({
					"status": 404,				
					"response": "Aluno não encontrado"
				}));				
			}

		}
	});
	connection.end();
}

/**
 * Posts
 */

module.exports.alunoSeguirTurmaPost = function (application, req, res) {

	var connection = application.config.dbconnection();
	let dados = req.body

	let query = `
		INSERT INTO segue(fk_turma, fk_aluno)
		VALUES (${dados.idTurma}, ${dados.idAluno});
	`		
	
	connection.query(query, function (error, results, fields) {		
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {
			res.send(JSON.stringify({
				"status": 200,				
				"response": "Aluno seguiu a turma com sucesso"
			}));
		}

		connection.end()
	});
}

// ok
module.exports.alunosPost = function (application, req, res) {

	var connection = application.config.dbconnection();

	let dados = req.body

	let query = `
		INSERT INTO alunos(id_aluno, nome, email, senha)
		VALUES (DEFAULT, '${dados.nome}', '${dados.email}', '${dados.senha}');
	`
	console.log(query)

	connection.query(query, function (error, results, fields) {
		console.log(error)
		console.log(results)
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "Erro Inesperado"				
			}));
		} else {
			res.send(JSON.stringify({
				"status": 201,				
				"response": {
					"id": results.insertId,
					"nome": dados.nome,
					"email": dados.email
				}
			}));
		}

		connection.end()
	});
}

/**
 * Puts
 */

 // ok
module.exports.alunosPut = (application, req, res) => {

	let dados = req.body
	let connection = application.config.dbconnection()

	let query = `
		UPDATE alunos
		SET nome = '${dados.nome}',  email = '${dados.email}'
		WHERE id_aluno = ${dados.id}
	`

	connection.query(query, (error, results, fields) => {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}))
		} else {
			if(results.affectedRows){
				res.send(JSON.stringify({
					"status": 200,				
					"response": "Aluno atualizado com sucesso"
				}));
			} else {
				res.send(JSON.stringify({
					"status": 404,
					"response": "Aluno não encontrado"
				}))
			}
			
		}
		connection.end();
	})
}

/**
 * Delete
 */

// ok
module.exports.alunosIdDelete = (application, req, res) => {

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

			if(results.affectedRows){
				res.send(JSON.stringify({
					"status": 200,					
					"response": "Aluno excluído com sucesso!"
				}));
			} else {

			res.send(JSON.stringify({
				"status": 404,					
				"response": "Aluno não encontrado"
			}));
		}

		}
		connection.end();
	})
}