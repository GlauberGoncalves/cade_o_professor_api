function TurmasDAO(connection){
	this._connection = connection;
}

TurmasDAO.prototype.getTurmas = function(id, callback){
    this._connection.query(`
    SELECT t.id_turma, d.nome_disciplina, p.nome_professor, p.status, t.bloco, t.sala
    FROM turmas t
    JOIN disciplinas d ON d.id_disciplina=t.fk_disciplina
    JOIN professores p ON p.id_professor=t.fk_professor
    WHERE t.fk_disciplina = ${id}`, callback);
}

TurmasDAO.prototype.getHorariosTurma = function(id_turma, callback){
    this._connection.query(`
    SELECT h.dia_semana, h.hora FROM turmas t 
    INNER JOIN horarios H ON h.fk_turma=t.id_turma
    INNER JOIN professores p ON t.fk_professor=p.id_professor
    INNER JOIN disciplinas d ON t.fk_disciplina=d.id_disciplina
    WHERE t.id_turma = ${id_turma}
    `, callback)
}

module.exports = function(){
	return TurmasDAO;
}