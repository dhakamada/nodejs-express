var path    		= require('path');
var chai 			= require('chai');
var assert 			= require('chai').assert;
var should			= require('chai').should();
var contextApp 		= require(path.resolve('config', 'context-application'));

describe('Dependency Injection Test', function(){

	describe('#App', function(){
		
		it('deve validar todas as propriedades do contexto da aplicação', function(done){
			var app = { get : function(context){return 'context-application'}};

			require(path.resolve('lib', 'dependency-injection'))(app, function(err, result){

				for(var prop in contextApp){
					assert.isTrue(result.ctx.hasOwnProperty(prop));
				} 
				done();
			});
		});

		it('deve retornar error para um contexto inexistente', function(done){
			var app = { get : function(context){return 'context-???'}};

			require(path.resolve('lib', 'dependency-injection'))(app, function(err, result){
				should.exist(err);
				done();
			});
		});
	});
});