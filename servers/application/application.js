var express             = require('express');
var path                = require('path');
var load                = require('express-load');
var bodyParser          = require('body-parser');
var methodOverride      = require('method-override');
var ECT                 = require('ect');
var dateUtils           = require("date-utils");
var session             = require('express-session');
var cookieParser        = require('cookie-parser');

var app;
var server;

exports.start = function(port, callback) {
    app = express();

    // configuração da engine da view
    //http://ectjs.com/#benchmark
    app.set('view engine', 'ect');
    app.engine('ect', ECT({ watch: true, root: path.resolve('views'), ext: '.ect' }).render);

    // configurações do express
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: false}));
    app.use(methodOverride());
    var dir = path.resolve('public');
    app.use(express.static(dir));
    //variável utilizada para carregar as injeções de dependências

    // parse cookies
    app.use(cookieParser());
    //session
    app.use(session({secret : 'sessionId', saveUninitialized: 'true', resave: 'true'}));

    app.set('context', 'context-application');

    app.disable("x-powered-by");

    // irá carregar os pacotes para o express
    load(path.resolve('lib','dependency-injection'))
        .then('servers/application/controllers')
        .then('servers/application/routers')
        .then('middleware/error-handle')
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
        app.ctx.logger.info('Finalizando o servidor');
        server.close();
    }
};