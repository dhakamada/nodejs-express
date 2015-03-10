var path              = require('path')
var server 			  = require('./servers/application/application');
var cfg 			  = require('konfig')({ path: path.resolve('config')}).properties;

// responsável por startar a aplicação

server.start(cfg.servers.application.port | 4000 );