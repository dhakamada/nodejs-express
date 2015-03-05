var path              = require('path')
var server 			  = require(path.resolve('servers', 'server.js'));
var cfg 				= require('konfig')({ path: path.resolve('config')}).properties;

server.start(cfg.server.port);