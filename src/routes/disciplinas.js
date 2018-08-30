module.exports = function(application){
	application.get('/api/v1/disciplinas/', function(req, res){		
		application.src.controllers.disciplinasCtrl.getTodasDisciplinas(application, req, res)
	});

	application.get('/api/v1/disciplinas/:id', function(req, res){		
		application.src.controllers.disciplinasCtrl.getDisciplinaPorId(application, req, res)
	});

	application.get('/api/v1/disciplinas/nome/:nome', function(req, res){		
		application.src.controllers.disciplinasCtrl.getDisciplinaPorNome(application, req, res)
	});

	application.get('/api/v1/disciplinas/professor/:id', function(req, res){		
		application.src.controllers.disciplinasCtrl.getDisciplinasDoProfessorPorId(application, req, res)
	});

	/**
	 * Posts
	 */

	application.post("/api/v1/disciplinas/incluir/", (req, res) => {		
		application.src.controllers.disciplinasCtrl.insertDisciplina(application, req, res)
	});

	application.post("/api/v1/disciplinas/horario/incluir/", (req, res) => {		
		application.src.controllers.disciplinasCtrl.insertHorarioDisciplina(application, req, res)
	})

	/**
	 * Puts
	 */

	 application.put('/api/v1/disciplinas/', (req, res) => {
		application.src.controllers.disciplinasCtrl.updateDisciplina(application, req, res)
	 })

	 application.put('/api/v1/disciplinas/horario/', (req, res) => {
		application.src.controllers.disciplinasCtrl.updateDisciplinaHorario(application, req, res)
	 })

	/**
	 * Delete
	 */

	 application.delete('/api/v1/disciplinas', (req, res) => {
		 application.src.controllers.disciplinasCtrl.deleteDisciplina(application, req, res)
	 })

}