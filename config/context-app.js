var path    = require("path");
var cfg 	= require('konfig')({ path: path.resolve('config')}).properties;

module.exports = {

	logger: {
		create: {
			module: path.resolve('lib', 'log'),
			args: [ cfg.log.app ],
			isConstructor: false
		}
	},

	mongo: {
		create: {
			module: path.resolve('lib', 'mongodb'),
			args: [ 
					{ $ref:'logger'},
					cfg.mongo 
			],
			isConstructor: false
		}
	},

}