var path    		= require('path');
var cfg 			= require('konfig')({ path: path.resolve('config')}).properties;
var assert 			= require('chai').assert;
var logger 			= require(path.resolve('lib', 'log'));

describe('Mongo Tests', function(){

	describe("#Connection Test", function(){
		var log, err;

		before(function(){
			var options = cfg.log.app;
			log = logger(options);
		});

		it("deve conectar com o mongo sem erro", function(){
			try{
				require(path.resolve('lib', 'mongodb'))(log, cfg.mongo);
			}catch(e){
				err = e;
			}
			assert.isUndefined(err, 'não há error');
		});

		it("deve retornar error quando não informar as configurações", function(){
			try{
				require(path.resolve('lib', 'mongodb'))(log, null);
			}catch(e){
				err = e;
			}
			assert.isNotNull(err, 'ocorreu erro ao conectar');
		});

	});
});
