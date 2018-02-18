import winston from 'winston';
import config from './config';

const logger = new winston.Logger({
  transports: [new winston.transports.Console(config.winston)],
});
logger.level = process.env.LOGGER_LEVEL
  ? process.env.LOGGER_LEVEL
  : config.logger.level;

export default logger;
