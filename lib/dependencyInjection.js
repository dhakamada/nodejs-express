var path    = require('path');
var wire    = require('wire');

/**
 *
 * carrega a injeção de dependência conforme o contexto
 *
 * @author Diego Hakamada
 */

module.exports = function(app, callback){

    var context = app.get('context');
    var pathContext = path.resolve('config', context);

	wire(require(pathContext))
        .then(function (ctx) {
            app = ctx;
            app.logger.info('Carregado injeção de dependência');
            callback();
        }, 
        function (e) {
            console.log('Falha ao carregar as dependência', e.stack || e);
        })
        .otherwise(function (e) {
            console.log('Erro ao inicializar o %s', app, e.stack || e)
        });
    
}