var express             = require('express');
var path                = require('path');
var load                = require('express-load');
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var session             = require('express-session');
var ect                 = require('ect');
var ectRenderer         = ect({ watch: true, root: __dirname + '/views' });
var logger              = require(path.resolve('lib','log'));
var dateUtils           = require("date-utils");

var app;
var server;

exports.start = function(callback) {
    app = express();

    // configuração da view do node
    //http://ectjs.com/#benchmark
    app.engine('.ect', ectRenderer.render);

    // configurações do express
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(methodOverride());
    app.use(session({secret : 'app', saveUninitialized: 'true', resave: 'true'}));
    var dir = path.resolve('public');
    app.use(express.static(dir));
    //variável utilizada para carregar as injeções de dependências
    app.set('context', 'context-server');
    app.logger = logger;

    // irá carregar os pacotes para o express
    load(path.resolve('lib','dependencyInjection'))
        .then('servers/app/controllers')
        .then('servers/app/routes')
        .into(app, function(err, instance) {
            if(err) throw err;
                //start server
                server = app.listen(3000);
                   
                if (callback) {
                    process.nextTick(function() {
                        callback(app);
                    });
                }        
            });
}

exports.stop = function() {
    if (server) {
        logger.info('Finalizando o servidor');
        server.close();
    }
};