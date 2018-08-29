module.exports = function(application){
	application.get('/api/v1/professores/', function(req, res){		
		application.src.controllers.professoresCtrl.getTodosProfessores(application, req, res)
	});

	application.get('/api/v1/professores/:id', function(req, res){		
		application.src.controllers.professoresCtrl.getProfessoresId(application, req, res)
	});

	application.get('/api/v1/professores/nome/:nome', function(req, res){		
		application.src.controllers.professoresCtrl.getProfessoresNome(application, req, res)
	});

	application.get('/api/v1/professores/status/:id', function(req, res){		
		application.src.controllers.professoresCtrl.getStatusProfessor(application, req, res)
	});

	/**
	 * Posts
	 */

	application.get('/api/v1/professores/incluir/', function(req, res){		
		application.src.controllers.professoresCtrl.getAlunos(application, req, res)
	});
	
	/**
	 * Puts
	 */

	application.put('/api/v1/professores/status/:id/:status', function(req, res){		
		application.src.controllers.professoresCtrl.updateStatusProfessor(application, req, res)
	});
}