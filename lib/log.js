var winston 		= require('winston');
var path    		= require("path");
var cfg 			= require('konfig')({ path: path.resolve('config')}).properties;
var dateUtil 		= require("date-utils");

/**
 *
 * carrega o arquivo de log configurado para Rotacionar
 *
 * @author Diego Hakamada
 */

var logger = new winston.Logger({
	transports: [
		new winston.transports.DailyRotateFile({
			level			: cfg.log.level,
			colorize		: cfg.log.colorize,
			timestamp		: function() {
									var date = new Date();
									return date.toFormat('YYYY-MM-DD HH24:MI:SS');
							},
			filename		: cfg.log.server,
			datePattern		: '-yyyy-MM-dd',
			json: false
		})
	]
});

module.exports = logger;