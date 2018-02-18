import winston from 'winston';
import config from './config';

/**
 * Logging Levels
 * error: 0,
 * warn: 1,
 * info: 2,
 * verbose: 3,
 * debug: 4,
 * silly: 5
 */

const logger = new winston.Logger({
  transports: [new winston.transports.Console(config.winston)],
});
logger.level = process.env.LOGGER_LEVEL
  ? process.env.LOGGER_LEVEL
  : config.logger.level;

export default logger;
