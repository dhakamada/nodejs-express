module.exports = function(app) {

	var homeController = app.servers.application.controllers.homeController;

	app.get('/', homeController.index);
};