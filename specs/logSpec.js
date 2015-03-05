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

	describe('# arquivo de configuração do log', function(){

		it('deve validar o options', function (done){
			assert.typeOf(options, 'object');
			assert.equal(options.filename, '/var/log/servers/app');
			assert.equal(options.level, 'debug');
			assert.equal(options.colorize, true);
			assert.equal(options.datePattern, '-yyyy-MM-dd');
			assert.equal(options.json, false);
			done();
		});

		it('deve validar o file', function (done){
			assert.typeOf(log, 'object');
			done();

		});
	});

	describe('# criar arquivo de log', function(){
		
		it('deve retornar true quando verificar se existe', function (done){

			log.info('criar arquivo de log');

			fs.exists(options.filename + '-' + new Date().toFormat('YYYY-MM-DD'), function(exists){
				assert.equal(exists, true);
				done();
			});
		});
	});
});