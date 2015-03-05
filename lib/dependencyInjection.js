var path    = require("path");
var wire    = require("wire");

/**
 *
 * carrega a injeção de dependência conforme o contexto
 *
 * @author Diego Hakamada
 */

module.exports = function(app, callback){

    var context = app.get('context');
    var pathContext = path.resolve('config', context);
    var logger = app.logger;

	wire(require(pathContext))
        .then(function (ctx) {
            logger.info('Carregado injeção de dependência');
            app.ctx = ctx;
            callback();
        }, 
        function (e) {
            logger.error('Falha ao carregar as dependência', e.stack || e);
        })
        .otherwise(function (e) {
            logger.info('Erro ao inicializar o %s', app, e.stack || e)
        });
    
}