module.exports = function (app){

	var CsrfController = {

		get : function (req, res){
			res.render('csrf/csrf-form', { csrfToken: req.csrfToken() });
		},

		post : function (req, res){
			res.render('csrf/csrf-sucess');
		}

	}

	return CsrfController;
}