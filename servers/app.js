var express             = require('express');
var path                = require('path');
var load                = require('express-load');
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var ect                 = require('ect');
var ectRenderer         = ect({ watch: true, root: __dirname + '/views' });
var dateUtils           = require("date-utils");

var app;
var server;

exports.start = function(port, callback) {
    app = express();

    // configuração da engine da view
    //http://ectjs.com/#benchmark
    app.engine('.ect', ectRenderer.render);

    // configurações do express
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    // actions de PUT E DELETE
    app.use(methodOverride());
    var dir = path.resolve('public');
    app.use(express.static(dir));
    //variável utilizada para carregar as injeções de dependências
    app.set('context', 'context-app');

    app.disable("x-powered-by");

    // irá carregar os pacotes para o express
    load(path.resolve('lib','dependencyInjection'))
        .then('servers/app/controllers')
        .then('servers/app/routes')
        .into(app, function(err, instance) {
            if(err) throw err;
                //start server
                server = app.listen(port);
                   
                if (callback) {
                    process.nextTick(function() {
                        callback(app);
                    });
                }        
            });
}

exports.stop = function() {
    if (server) {
        app.logger.info('Finalizando o servidor');
        server.close();
    }
};