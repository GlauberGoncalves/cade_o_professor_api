module.exports.getTurmaPorId = function (application, req, res) {

    let id = req.params.id
    let connection = application.config.dbconnection();    
    let turmasDao = new application.src.models.turmasDao(connection)


	turmasDao.getTurmas(id, function (error, results, fields) {
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

module.exports.getHorariosTurma = function (application, req, res) {

	let id = req.params.id_turma

    let connection = application.config.dbconnection();    
	let turmasDao = new application.src.models.turmasDao(connection)
	
	let resultFinal = {
		"turma": {},
		"grade": []
	}	

	let query = `
		SELECT d.nome_disciplina, d.descricao, t.bloco, t.sala, p.nome_professor, p.status FROM turmas t
		INNER JOIN professores p ON p.id_professor=t.fk_professor
		INNER JOIN disciplinas d ON d.id_disciplina=t.fk_disciplina
		WHERE t.id_turma=${1};
	`;	

	connection.query(query , (error, results1, fields) => {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"error": error,
				"response": "ops... tentei mas não deu"
			}))			
		} else {
			resultFinal.turma = results1
		}
	})

	turmasDao.getHorariosTurma(1, function (error, results, fields) {
		if (error) {
			res.send(JSON.stringify({
				"status": 500,
				"error": error,
				"response": "ops... tentei mas não deu"
			}));
			
		} else {
				
			for (let i = 0; i < results.length; i++) {

				if (i == 0) {
					resultFinal.grade.push({
						"dia_semana": results[i].dia_semana,
						"horarios": [results[i].hora]
					});

				} else {

					let tamanho = resultFinal.grade.length
					if (resultFinal.grade[tamanho - 1].dia_semana == results[i].dia_semana) {
						resultFinal.grade[tamanho - 1].horarios.push(results[i].hora)												

					} else {
						resultFinal.grade.push({
							"dia_semana": results[i].dia_semana,
							"horarios": [results[i].hora]
						});
					}
				}
				results[0]
			}

			res.send(JSON.stringify({
				"status": 200,
				"error": null,
				"response": resultFinal
			}));

			connection.end();
		}
	})	
}