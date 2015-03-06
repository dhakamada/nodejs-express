var winston 		= require('winston');
var path    		= require('path');
var cfg 			= require('konfig')({ path: path.resolve('config')}).properties;
var dateUtil 		= require('date-utils');

/**
 *
 * Lib de log para inicializar 
 *
 * @author Diego Hakamada
 */

function createLogger(options){
	return new winston.Logger({
						transports: [
							new winston.transports.DailyRotateFile({
								level			: options.level,
								colorize		: options.colorize,
								timestamp		: function() {
														var date = new Date();
														return date.toFormat('YYYY-MM-DD HH24:MI:SS');
												},
								filename		: options.filename,
								datePattern		: options.datePattern,
								json: options.json
							})
						]
				});
}

module.exports = createLogger;