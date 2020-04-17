const { createLogger, transports, format } = require('winston');

const logger = createLogger({
  format: format.combine(
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
    format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`)
  ),
  transports: [
    new transports.File({
      filename: './logs/all-logs.log',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.File({
      filename: './logs/errors.log',
      level: 'error',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.File({
      filename: './logs/combined.log',
      level: 'info',
      json: false,
      maxsize: 5242880,
      maxFiles: 5,
    }),
    new transports.Console(),
  ]
});

// log priority =>
// {
//   error: 0, (most important)
//   warn: 1,
//   info: 2,
//   verbose: 3,
//   debug: 4,
//   silly: 5  (least important)
// }

logger.info('some info logging message');
logger.warn('some warn logging message');
logger.error('some error logging message');

module.exports = logger;