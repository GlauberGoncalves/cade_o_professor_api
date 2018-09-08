function AlunosDAO(connection){
	this._connection = connection;
}

AlunosDAO.prototype.getTodosAlunos = function(callback){
	this._connection.query(`SELECT * FROM alunos`, callback);
}

AlunosDAO.prototype.getAlunoPorId = function(id_aluno, callback){	
	this._connection.query(`SELECT * from alunos WHERE id_aluno=` + id_aluno, callback)
}

AlunosDAO.prototype.getAlunoPorEmail = function(email, callback){	
	this._connection.query(`SELECT id_aluno, nome from alunos WHERE email =` + email, callback)
}

AlunosDAO.prototype.getDisciplinasSeguidas = function(id_aluno, callback){
	
	let query = `
		SELECT a.nome, d.nome_disciplina, p.nome_professor,p.status, dp.bloco, dp.sala FROM alunos a
		INNER JOIN segue s ON s.fk_aluno=a.id_aluno
		INNER JOIN disc_professor dp ON dp.id_disc_professor=s.fk_disc_professor
		INNER JOIN disciplina d ON d.id_disciplina=dp.fk_disciplina
		INNER JOIN professores p ON p.id_professor=dp.fk_professor
		WHERE A.id_aluno = ${id_aluno} ;
	`;

	this._connection.query(query, callback)
}

AlunosDAO.prototype.insertSeguirDisciplina = function(id_aluno, id_disc,  callback){
	let query = `
		INSERT INTO segue(fk_disc_professor, fk_aluno)
		VALUES ( ${id_aluno} , ${id_disc} )
	`

	this._connection.query(query, callback);
}

module.exports = function(){
	return AlunosDAO;
}