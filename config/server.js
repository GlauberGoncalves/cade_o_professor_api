/* importar o módulo do framework express */
var express = require('express');

/* importar o módulo do consign */
var consign = require('consign');

/* importar o módulo do body-parser */
var bodyParser = require('body-parser');

/* iniciar o objeto do express */
var app = express();

/* configurar o middleware express.static */
app.use(express.static('./src/public'));

/* configurar o middleware body-parser */
app.use(bodyParser.urlencoded({extended: true}));

/* efetua o autoload das rotas, dos models e dos controllers para o objeto app */
consign()
	.include('src/routes')	
	.then('src/controllers')
	.then('config/dbconnection.js')
	.into(app);

/* exportar o objeto app */
module.exports = app;