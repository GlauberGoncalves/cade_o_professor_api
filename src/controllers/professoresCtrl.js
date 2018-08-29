module.exports.getTodosProfessores = function(application, req, res){

    var connection = application.config.dbconnection();

	let query = `
		SELECT id_professor, nome_professor, email FROM professores;
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

module.exports.getProfessoresId = function(application, req, res){

    var connection = application.config.dbconnection();

	let query = `
		SELECT id_professor, nome_professor, email 
		FROM professores
		WHERE id_professor=${req.params.id};
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

module.exports.getProfessoresNome = function(application, req, res){

    var connection = application.config.dbconnection();

	connection.query(`SELECT id_professor, nome_professor, email FROM professores WHERE nome_professor like "${'%'+ req.params.nome + '%'}"`, function (error, results, fields) {
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

module.exports.getStatusProfessor = function(application, req, res){

    var connection = application.config.dbconnection();

	connection.query(`
		SELECT p.id_professor, p.nome_professor, p.email, p.status
		FROM professores p WHERE id_professor=${req.params.id}`, function (error, results, fields) {
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

module.exports.insertProfessor = function(application, req, res){

    res.send('a fazer')
}

module.exports.updateStatusProfessor = function(application, req, res){

    var connection = application.config.dbconnection();

	connection.query(`
		UPDATE professores
		SET status = '${req.params.status}'
		WHERE id_professor=${req.params.id}`, function (error, results, fields) {
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