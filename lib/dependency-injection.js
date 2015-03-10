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
    var context; 

    try{
        
        context = require(pathContext); 
        wire(require(pathContext, callback))
            .then(function (ctx) {
                app.ctx = ctx;
                app.ctx.logger.info('Carregado injeção de dependência');
                callback(null, app);
            }, 
            function (e) {
                console.log('Falha ao carregar as dependência', e.stack || e);
                callback(e);
            })
            .otherwise(function (e) {
                console.log('Erro ao inicializar o %s', app, e.stack || e);
                callback(e);
            });

    }catch (e){
        callback(e);
    }
}