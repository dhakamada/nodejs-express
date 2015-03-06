var MongoClient = require('mongodb').MongoClient
var connection;

function createMongoClient(logger, config){

	var url = createUrl(config);

	if(!url){
		logger.error('Erro ao carregar configurações do mongo');
		return;
	}

	if(!connection){
		MongoClient.connect(url, function(err, mongoClient) {
			if(err) throw err;

			logger.info('Carregado conexão com a base de dados');
			connection = mongoClient;
		});
	}else{
		logger.info('Conectado com a base de dados');
	}

	

	return connection;
}

function createUrl(config){

	var url = null;
	var hosts = [];
	var options = [];

	for (var key in config.servers){
		if(config.servers[key].host && config.servers[key].port){
			hosts.push(config.servers[key].host + ":" + config.servers[key].port);
		}
	}

	for (var key in config.options){
		if(config.options[key] != undefined){
			options.push(key + "=" + config.options[key])
		}
	}

	if(hosts.length > 0 && options.length > 0){
		url = "mongodb://" + hosts.toString() + "/" + config.database + "?" + options.toString().replace(/,/g, '&');
	}

	return url;
}

module.exports = createMongoClient;