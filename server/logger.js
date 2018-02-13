import winston from 'winston';
import config from './config';

const logger = new winston.Logger({
  transports: [new winston.transports.Console(config.winston)],
});

export default logger;
