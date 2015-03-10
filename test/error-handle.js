var path 			= require('path');
var chai 			= require('chai');
var assert 			= require('chai').assert;
var server 			= require(path.resolve('servers', 'application', 'application'));
var request 		= require('request');

describe('Errors Handle Tests', function(){

	before(function(){
		server.start(12345);
	});

	it('deve retornar Not Found quando solicitar uma página não mapeada', function (){
		request({
				uri 		: 'http://localhost:12345/notfoundpage',
				method		: 'GET'
			}, function (err, res, body){
				assert.isNotNull(res);
				assert.equal(404, res.statusCode);
			});
	});

	it('deve retornar status 200 quando solicitar a página inicial', function (){
		request({
				uri 		: 'http://localhost:12345/',
				method		: 'GET',
				headers		: {'Content-Type': 'application/json', 'Accept': 'application/json'}
			}, function (err, res, body){
				assert.isNotNull(res);
				assert.isNotNull(body);
				assert.equal(200, res.statusCode);
			});
	});

	after(function(){
		server.stop();
	});

});