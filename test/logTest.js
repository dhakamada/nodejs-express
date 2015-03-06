var path    		= require('path');
var cfg 			= require('konfig')({ path: path.resolve('config')}).properties;
var logger 			= require(path.resolve('lib', 'log'));
var assert 			= require('chai').assert;
var fs 				= require('fs');

describe('Logger Aplicação', function(){
	var options, log;

	before(function(){
		options = cfg.log.app;
		log = logger(options);
	});

	describe('#arquivo de configuração do log', function(){

		it('deve retornar um object de log', function (){
			assert.typeOf(log, 'object');
		});

		it('deve validar o options', function (){
			assert.typeOf(options, 'object');
			assert.equal(options.filename, path.resolve(log.transports.dailyRotateFile.dirname, log.transports.dailyRotateFile.filename));
			assert.equal(options.level, log.transports.dailyRotateFile.level);
			assert.equal(options.colorize, log.transports.dailyRotateFile.colorize);
			assert.equal(options.datePattern, log.transports.dailyRotateFile.datePattern);
			assert.equal(options.json, log.transports.dailyRotateFile.json);
		});
	});

	describe('#criar arquivo de log', function(){

		before(function(){
			log.info('Sucesso ao criar arquivo de log');
		})
		
		it('deve retornar true quando verificar se existe o arquivo de log', function (){
			fs.exists(options.filename + '-' + new Date().toFormat('YYYY-MM-DD'), function(exists){
				assert.equal(exists, true);
			});
		});
	});
});