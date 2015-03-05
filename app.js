var path              = require('path')
var server 			  = require(path.resolve('servers', 'app.js'));
var cfg 			  = require('konfig')({ path: path.resolve('config')}).properties;

// responsável por startar a aplicação

server.start(cfg.servers.app.port);