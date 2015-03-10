module.exports = function(app) {

	// setup route middlewares 
	var csrf = require('csurf');
	var csrfProtection = csrf({ cookie: true });
	var csrfController = app.servers.application.controllers.csrfController;

	app.get('/form', csrfProtection, csrfController.get);

	app.post('/form', csrfProtection, csrfController.post);

};