module.exports = function(application){

	/****************************
	 * 
	 *   Gets
	 * 
	 ***************************/
	
	application.get('/api/v1/alunos/', function(req, res){		
		application.src.controllers.alunosCtrl.getTodosAlunos(application, req, res)
	});

	application.get('/api/v1/alunos/:id', function(req, res){		
		application.src.controllers.alunosCtrl.getAlunoPorId(application, req, res)
	});

	application.get('/api/v1/alunos/email/:email', function(req, res){		
		application.src.controllers.alunosCtrl.getAlunoPorEmail(application, req, res)
	});

	application.get('/api/v1/alunos/segue/:id', function(req, res){		
		application.src.controllers.alunosCtrl.getDisciplinasSeguidas(application, req, res)
	});

	/****************************
	 * 
	 *   Posts
	 * 
	 ***************************/

	application.post('/api/v1/alunos/seguir/', function(req, res){		
		application.src.controllers.alunosCtrl.seguirDisciplina(application, req, res)
	});

	application.post('/api/v1/alunos/', function(req, res){		
		application.src.controllers.alunosCtrl.insertAluno(application, req, res)
	});

	application.post('/api/v1/alunos/login/', function(req, res){		
		application.src.controllers.alunosCtrl.login(application, req, res)
	});

}