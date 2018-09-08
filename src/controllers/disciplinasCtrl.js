module.exports.getTodasDisciplinas = function(application, req, res){

    var connection = application.config.dbconnection();

	let query = `
		SELECT * FROM disciplinas;
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

module.exports.getDisciplinaPorId = function(application, req, res){

    var connection = application.config.dbconnection();

	let query = `
		SELECT * FROM disciplinas WHERE id_disciplina=${req.params.id};
	`;

	connection.query(query, function (error, results, fields) {
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
    
    connection.end();
}

module.exports.getDisciplinaPorNome = function(application, req, res){

    var connection = application.config.dbconnection();

	connection.query(`SELECT * from disciplinas WHERE nome_disciplina like "${'%'+ req.params.nome + '%'}"`, function (error, results, fields) {
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

module.exports.getDisciplinasDoProfessorPorId = function(application, req, res){

    var connection = application.config.dbconnection();
	
	let query = `
		SELECT d.nome_disciplina, d.descricao, t.bloco, t.sala, p.nome_professor, p.status FROM turmas t
		INNER JOIN professores p ON p.id_professor=t.fk_professor
		INNER JOIN disciplinas d ON d.id_disciplina=t.fk_disciplina
		WHERE d.id_disciplina=${req.params.id};
	`;

	let queryHorarios = `
		SELECT h.dia_semana, h.hora FROM turmas t
		INNER JOIN horarios h ON h.fk_turma=t.id_turma
		WHERE t.id_turma=${req.params.id}
		ORDER BY h.dia_semana asc
	`
	
	connection.query(query, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"response": "ops... tentei mas não deu"
			}));
		} else {
					
			connection.query(queryHorarios, function (error, results2, fields) {
				if (error) {
					res.send(JSON.stringify({
						"status": 500,
						"response": "ops... tentei mas não deu",
						"erro":error

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

					connection.end();
				}
			});
		}
	});    	
	
}

/**
 * Post methods
 */

module.exports.insertDisciplina = function(application, req, res){

	var connection = application.config.dbconnection();

	let dados = req.body	

	let query = `
		INSERT INTO disciplinas(id_disciplina, nome_disciplina, descricao)
		VALUES (DEFAULT,'${dados.disciplina}', '${dados.descricao}');
	`

	console.log(query)

	connection.query( query , function (error, results, fields) {
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
	});

}

module.exports.insertHorarioDisciplina = function(application, req, res){

	var connection = application.config.dbconnection();

	let dados = req.body

	let query = `
		INSERT INTO horarios(fk_turma, dia_semana, hora)
		VALUES (${dados.id}, '${dados.dia_semana}', '${dados.hora}');
	`	

	connection.query( query , function (error, results, fields) {
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
	});

}

/**
 * Put methods
 */

 module.exports.updateDisciplina = (application, req, res) => {
	
	
	let dados = req.body
	let connection = application.config.dbconnection()
	
	let query = `
		UPDATE disciplinas
		SET nome_disciplina = '${dados.disciplina}', descricao = '${dados.descricao}'
		WHERE id_disciplina = ${dados.id}
	`;	

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
	});	
 }

 /**
 * Delete methods
 */

 module.exports.deleteDisciplina = (application, req, res) => {	 	
	
	let dados = req.body
	let connection = application.config.dbconnection()

	let query = `
		DELETE FROM disciplinas
		WHERE id_disciplina = ${dados.id}
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