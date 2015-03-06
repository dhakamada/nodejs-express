var path    		= require('path');
var chai 			= require('chai');
var assert 			= require('chai').assert;
var should			= require('chai').should();
var contextApp 		= require(path.resolve('config', 'context-app'));

describe('Injeção de Independência', function(){

	describe('#App', function(){
		
		it('deve validar todas as propriedades do contexto da aplicação', function(done){
			var app = { get : function(context){return 'context-app'}};

			require(path.resolve('lib', 'dependencyInjection'))(app, function(err, result){
				for(var prop in contextApp){
					assert.isTrue(result.hasOwnProperty(prop));
				} 
				done();
			});
		});

		it('deve retornar error para um contexto inexistente', function(done){
			var app = { get : function(context){return 'context-???'}};

			require(path.resolve('lib', 'dependencyInjection'))(app, function(err, result){
				should.exist(err);
				done();
			});
		});
	});
});