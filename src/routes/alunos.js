module.exports = function(application){

	/****************************
	 * 
	 *   Get
	 * 
	 ***************************/
	
	application.get('/api/v1/alunos/', function(req, res){		
		application.src.controllers.alunosCtrl.alunosGet(application, req, res)
	});

	application.get('/api/v1/alunos/:id', function(req, res){		
		application.src.controllers.alunosCtrl.alunosIdGet(application, req, res)
	});

	application.get('/api/v1/alunos/email/:email', function(req, res){		
		application.src.controllers.alunosCtrl.alunoEmailGet(application, req, res)
	});

	application.get('/api/v1/alunos/turmas/seguidas/:id', function(req, res){		
		application.src.controllers.alunosCtrl.alunosTurmasSeguidasIdGet(application, req, res)
	});

	/****************************
	 * 
	 *   Post
	 * 
	 ***************************/

	application.post('/api/v1/alunos/', function(req, res){		
		application.src.controllers.alunosCtrl.alunosPost(application, req, res)
	});

	application.post('/api/v1/alunos/seguirturma/', function(req, res){		
		application.src.controllers.alunosCtrl.alunoSeguirTurmaPost(application, req, res)
	});

	application.post('/api/v1/alunos/login/', function(req, res){		
		application.src.controllers.alunosCtrl.login(application, req, res)
	});

	/****************************
	 * 
	 *   Delete
	 * 
	 ***************************/
	
	application.delete('/api/v1/alunos/', function(req, res){			
		application.src.controllers.alunosCtrl.alunosIdDelete(application, req, res)
	});

	/****************************
	 * 
	 *   Put
	 * 
	 ***************************/
	
	application.put('/api/v1/alunos/', function(req, res){			
		application.src.controllers.alunosCtrl.alunosPut(application, req, res)
	});


}