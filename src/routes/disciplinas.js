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

}