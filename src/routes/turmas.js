module.exports = function(application){

	/****************************
	 * 
	 *   Gets
	 * 
	 ***************************/

	application.get('/api/v1/turmas/', function(req, res){		
		application.src.controllers.turmasCtrl.getTurmas(application, req, res)
	});

	application.get('/api/v1/turmas/:id', function(req, res){		
		application.src.controllers.turmasCtrl.getTurmaPorId(application, req, res)
	});

	application.get('/api/v1/turmas/all/:id_turma', function(req, res){
		application.src.controllers.turmasCtrl.getHorariosTurma(application, req, res)
	})

	application.get('/api/v1/turmas/todas/:id_turma', function(req, res){
		application.src.controllers.turmasCtrl.getHorariosTurma(application, req, res)
	})

	/****************************
	 * 
	 *   Posts
	 * 
	 ***************************/

    //  inserir turma
	// application.post('/api/v1/turmas/', function(req, res){		
    
    
	// });


}