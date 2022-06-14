const winston = require('winston');

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'bot-service' },
  transports: [
    new winston.transports.Console(),
  ],
});

module.exports = logger;
